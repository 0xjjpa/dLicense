# dLicense
A decentralised license-issuer registry to provide license-keys to WASM-based binaries

## Introduction

`dLicense` is born out of the need for developers to
publish and distribute applications to their users using an open store
that does not take a huge cut out of creators, yet ensures their
solutions come from the right developer, and can be used only after a
successful payment using the Arweave UDL.

## Worflow

```
dLicense
┌────────────────────────────────────────────────────────┐
│                                                        │
│    ┌───────┐                                           │
│    │       ├─┐                          ┌──────────┐   │
│ ┌──┤ WASM  │ │         ┌─────────┐      │          │   │
│ │  │       │ │         │         │      │  client  │   │
│ │  │       │ ├───┬───► │ arweave │ ◄────┤          │   │
│ │  └┬──────┘ │   │     │         │      │          │   │
│ │   │ UDL    │   │     ├─────────┤      └───────┬──┘   │
│ │   └────────┘   │     ├─────────┤              │      │
│ │                │     │         │              │      │
│ │                └───► │ kwil db │ ◄── web 3  ◄─┘      │
│ │                      │         │     signature       │
│ └────────────────────► └─────────┘                     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

`dLicense` works by wrapping a Go library targetting the WASM runtime
with a Kwil-consumer client able to talk to a particular licensing DB.
Write access to this database is given only after a successful payment
to the UDL address + amount defined by `dLicense` upload processs. When
executed, the WASM will communicate with Kwil and verificate the client
with a web3 signature to ensure the payee is the same runner of the client.

## Purpose
Right now the distribution of binaries and other applications are gated
by major distribution channels in most operating systems. Without having
a decentralized way to purchase applications or submit licenses, devs have
no recourse to charge for their software outside of these ecosystems.

`dLicense` aims to solve that by providing not only a entire licensing and
payment workflow, but also does it in a decentralized fashion ensuring
developers can not be censored nor their payments chipped away by existing
financial rails such as credit cards.

## Technology

- [Arweave](https://www.arweave.org/) - For uploading the WASM binaries
- [Arweave's UDL](https://permaweb.news/arweave-s-universal-data-license-the-future-of-web3-content-creation) - For defining the licensing terms of the binaries.
- [Bundlr](https://bundlr.network/) - For interacting with the Arweave network using EVM-compatible wallets.
- [Kwil](https://www.kwil.com/) - For managing the state of the WASM licenses
- [NextJs](https://nextjs.org/) - For developing the APIs and front-end of the app.

## Tooling

- **dlicense-web** - TypeScript/Node.js front-end and backend API for dLicense.
- **dlicense-wrapper** - Golang wrapper for interacting with Kwil via Go.
- **key-extractor** - Utility to fetch and process mnemonic based wallets.
