import { Player, PlayerEvent } from '@lottiefiles/react-lottie-player';
import { AnimationItem } from 'lottie-web';
import React, { useEffect, useState } from 'react';

export enum AnimationName {
  generic = 'generic',
  kintoloader = 'kintoloader',
}

class AnimationCache {
  private static instance: AnimationCache;
  private cache: Map<string, any>;

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): AnimationCache {
    if (!AnimationCache.instance) {
      AnimationCache.instance = new AnimationCache();
    }
    return AnimationCache.instance;
  }

  public async getAnimation(name: string): Promise<any> {
    if (this.cache.has(name)) {
      return this.cache.get(name);
    }

    const response = await fetch(`/animations/${name}.json`);
    const data = await response.json();
    this.cache.set(name, data)
    return data;
  }
}

const animationCache = AnimationCache.getInstance();

interface AnimationProps {
  loop?: boolean;
  autoplay?: boolean;
  keepLast?: boolean;
  size?: number | string;
  speed?: number;
  hover?: boolean;
  setRef?: (ref:AnimationItem) => void;
  name: AnimationName;
  className?: string;
  completeCB?: () => void;
  frameCB?: () => void;
}

const Animation = ({
  speed = 1,
  autoplay = true,
  keepLast = true,
  loop = false,
  name,
  className,
  setRef,
  size = 300,
  completeCB,
  frameCB,
  hover = false,
}: AnimationProps) => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchAnimation = async () => {
      try {
        const data = await animationCache.getAnimation(name);
        if (isMounted) {
          setAnimationData(data);
        }
      } catch (error) {
        console.error('Error fetching animation:', error);
      }
    };

    fetchAnimation();

    return () => {
      isMounted = false;
    };
  }, [name]);

  if (!animationData) {
    // loading
    return <div></div>;
  }
  return (
    <Player
      className={className}
      speed={speed}
      autoplay={autoplay}
      loop={loop}
      lottieRef={(instance: AnimationItem) => {
        if (setRef) setRef(instance);
      }}
      hover={hover}
      src={animationData}
      keepLastFrame={keepLast}
      renderer={'svg'}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice',
        filterSize: {
          width: '200%',
          height: '200%',
          x: '-50%',
          y: '-50%',
        }
      }}
      onEvent={(event:PlayerEvent) => {
        if (event === PlayerEvent.Complete && completeCB) {
          completeCB();
        }
        if (event === PlayerEvent.Frame && frameCB) {
          frameCB();
        }
      }}
      style={{ width: size, height: 'auto' }}
    ></Player>
  );
};

export default React.memo(Animation);
