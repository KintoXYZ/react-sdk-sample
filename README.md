![image](https://github.com/user-attachments/assets/afa04276-6e6f-401d-ad09-136f82aa86be)

# Sample React Dapp Using Kinto Wallet SDK

This is a sample application demonstrating the integration of the [Kinto Wallet SDK](https://www.npmjs.com/package/kinto-web-sdk). The Kinto Wallet SDK provides a seamless way to interact with Kinto's Ethereum Layer 2 solution, enabling fast and secure transactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Links](#links)

## Prerequisites

Before using the sample app, ensure you have a **Kinto Wallet**.

Create an account by visiting [Kinto Onboarding](https://engen.kinto.xyz/onboarding).

## Installation

To get started with the sample app, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.

```bash
git clone https://github.com/KintoXYZ/react-sdk-sample
```

2. **Navigate to the Project Directory**: Change into the project directory.

```bash
cd react-sdk-sample
```

3. **Install Dependencies**: Use Yarn to install the necessary dependencies.

```bash
yarn install
```

4. **Set up a local certificate**: Needed to run the app on https.

```bash
brew install mkcert
mkcert -install
mkcert dev.kinto.xyz localhost 127.0.0.1 ::1

// You should see something like this
The certificate is at "./dev.kinto.xyz+3.pem" and the key at "./dev.kinto.xyz+3-key.pem" ✅
```

5. **Set up a local DNS**: Change the `etc/hosts` file to run the app locally on dev.kinto.xyz.

```bash
sudo nano /etc/hosts

// Add the following line and save the file
127.0.0.1       dev.kinto.xyz
```

6. **Start the Application**: Run the app using Yarn.

```bash
yarn start
```

## Usage

Once the application is running, you can explore the features provided by the Kinto Wallet SDK. This sample app demonstrates how to connect to a Kinto wallet, send transactions, and manage wallet interactions.

### Using your application

1. **Developer Account**: Create a developer account, deploy a contract, and create the application. Use your main contract address as the app address. Visit [Kinto Developers](https://engen.kinto.xyz/developers) to get started.

2. **Set the App Address**: Ensure you have set the app address in `App.tsx` in the `counterAddress` variable and make sure the Kinto Wallet SDK is initialized with that address.

## Links

- **Kinto Wallet SDK Package**: [Kinto Wallet SDK on npm](https://www.npmjs.com/package/kinto-web-sdk)
- **Kinto Documentation**: [Kinto SDK Documentation](https://docs.kinto.xyz/kinto-the-safe-l2/building-on-kinto/development-setup)
- **Kinto Developer Portal**: [Kinto Developer Portal](https://engen.kinto.xyz/developers)

For more information on how to use the Kinto Wallet SDK, please refer to the [Kinto Wallet SDK documentation](https://docs.kinto.xyz/kinto-the-safe-l2/building-on-kinto/development-setup).

---

This README provides a quick start guide for developers looking to integrate the Kinto Wallet SDK into their applications. For detailed documentation and advanced usage, please visit the links provided above.
