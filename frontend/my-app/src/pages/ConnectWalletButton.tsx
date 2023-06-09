import React, { useEffect, useState } from "react";

function isMetaMaskInstalled() {
  return Boolean(window.ethereum);
}

async function readAddress() {
  const method = "eth_requestAccounts";

  const accounts = await window.ethereum.request<string[]>({
    method
  });

  return accounts[0];
}

function getSelectedAddress() {
  return window.ethereum?.selectedAddress;
}

const ConnectWalletButton: React.FC<{
  onChange: (address: string | undefined) => void;
}> = ({ onChange }) => {
  const [address, setAddress] = useState<string | undefined>(
    getSelectedAddress()
  );

  const connectWallet = async () => {
    const selectedAddress = await readAddress();

    setAddress(selectedAddress);
    onChange(selectedAddress);
  };

  useEffect(() => {
    const eventName = `accountsChanged`;

    if (!isMetaMaskInstalled()) {
      return;
    }

    const listener = ([selectedAddress]: string[]) => {
      setAddress(selectedAddress);
      onChange(selectedAddress);
    };

    window.ethereum.on(eventName, listener);

    return () => {
      window.ethereum.removeListener(eventName, listener);
    };
  }, [onChange]);

  if (!isMetaMaskInstalled()) {
    return <>No wallet found. Please install MetaMask.</>;
  }

  if (address) {
    return <button>Connected with {address}</button>;
  }

  return <button onClick={connectWallet}>Connect Wallet</button>;
};

export default ConnectWalletButton;

declare global {
  interface Window {
    ethereum: {
      removeListener<T>(event: string, cb: (params: T) => void): void;

      request<T>(params: { method: string }): Promise<T>;

      on<T>(event: string, cb: (params: T) => void): void;

      selectedAddress: string | undefined;
    };
  }
}
