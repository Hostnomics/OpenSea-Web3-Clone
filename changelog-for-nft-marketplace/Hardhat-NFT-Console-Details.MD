## Hardhat console NFT Console

```console

nft-marketplace % npx hardhat console
Welcome to Node.js v16.14.0.
Type ".help" for more information.
> const contract = await ethers.getContractAt("NFT", "0x5FbDB2315678afecb367f032d93F642f64180aa3")
undefined
> contract
Contract {
  interface: Interface {
    fragments: [
      [ConstructorFragment], [EventFragment],
      [EventFragment],       [EventFragment],
      [FunctionFragment],    [FunctionFragment],
      [FunctionFragment],    [FunctionFragment],
      [FunctionFragment],    [FunctionFragment],
      [FunctionFragment],    [FunctionFragment],
      [FunctionFragment],    [FunctionFragment],
      [FunctionFragment],    [FunctionFragment],
      [FunctionFragment],    [FunctionFragment],
      [FunctionFragment]
    ],
    _abiCoder: AbiCoder { coerceFunc: null },
    functions: {
      'approve(address,uint256)': [FunctionFragment],
      'balanceOf(address)': [FunctionFragment],
      'getApproved(uint256)': [FunctionFragment],
      'isApprovedForAll(address,address)': [FunctionFragment],
      'mint(string)': [FunctionFragment],
      'name()': [FunctionFragment],
      'ownerOf(uint256)': [FunctionFragment],
      'safeTransferFrom(address,address,uint256)': [FunctionFragment],
      'safeTransferFrom(address,address,uint256,bytes)': [FunctionFragment],
      'setApprovalForAll(address,bool)': [FunctionFragment],
      'supportsInterface(bytes4)': [FunctionFragment],
      'symbol()': [FunctionFragment],
      'tokenCount()': [FunctionFragment],
      'tokenURI(uint256)': [FunctionFragment],
      'transferFrom(address,address,uint256)': [FunctionFragment]
    },
    errors: {},
    events: {
      'Approval(address,address,uint256)': [EventFragment],
      'ApprovalForAll(address,address,bool)': [EventFragment],
      'Transfer(address,address,uint256)': [EventFragment]
    },
    structs: {},
    deploy: ConstructorFragment {
      name: null,
      type: 'constructor',
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      gas: null,
      _isFragment: true
    },
    _isInterface: true
  },
  provider: EthersProviderWrapper {
    _isProvider: true,
    _events: [],
    _emitted: { block: -2 },
    formatter: Formatter { formats: [Object] },
    anyNetwork: false,
    _networkPromise: Promise {
      [Object],
      [Symbol(async_id_symbol)]: 44,
      [Symbol(trigger_async_id_symbol)]: 13,
      [Symbol(destroyed)]: [Object]
    },
    _maxInternalBlockNumber: -1024,
    _lastBlockNumber: -2,
    _pollingInterval: 4000,
    _fastQueryDate: 0,
    connection: { url: 'http://localhost:8545' },
    _nextId: 42,
    _hardhatProvider: BackwardsCompatibilityProviderAdapter {
      _wrapped: FixedGasProvider {
        _wrapped: AutomaticSenderProvider {
          _wrapped: [HardhatNetworkProvider],
          _wrappedProvider: [HardhatNetworkProvider]
        },
        _wrappedProvider: AutomaticSenderProvider {
          _wrapped: [HardhatNetworkProvider],
          _wrappedProvider: [HardhatNetworkProvider]
        },
        _gasLimit: 30000000
      },
      _provider: FixedGasProvider {
        _wrapped: AutomaticSenderProvider {
          _wrapped: [HardhatNetworkProvider],
          _wrappedProvider: [HardhatNetworkProvider]
        },
        _wrappedProvider: AutomaticSenderProvider {
          _wrapped: [HardhatNetworkProvider],
          _wrappedProvider: [HardhatNetworkProvider]
        },
        _gasLimit: 30000000
      },
      sendAsync: [Function: bound sendAsync],
      send: [Function: bound send],
      _sendJsonRpcRequest: [Function: bound _sendJsonRpcRequest] AsyncFunction
    },
    _eventLoopCache: { detectNetwork: null },
    _network: { chainId: 31337, name: 'unknown' }
  },
  signer: SignerWithAddress {
    _isSigner: true,
    address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    _signer: JsonRpcSigner {
      _isSigner: true,
      provider: [EthersProviderWrapper],
      _address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      _index: null
    },
    provider: EthersProviderWrapper {
      _isProvider: true,
      _events: [],
      _emitted: [Object],
      formatter: [Formatter],
      anyNetwork: false,
      _networkPromise: [Promise],
      _maxInternalBlockNumber: -1024,
      _lastBlockNumber: -2,
      _pollingInterval: 4000,
      _fastQueryDate: 0,
      connection: [Object],
      _nextId: 42,
      _hardhatProvider: BackwardsCompatibilityProviderAdapter {
        _wrapped: FixedGasProvider {
          _wrapped: AutomaticSenderProvider {
            _wrapped: [HardhatNetworkProvider],
            _wrappedProvider: [HardhatNetworkProvider]
          },
          _wrappedProvider: AutomaticSenderProvider {
            _wrapped: [HardhatNetworkProvider],
            _wrappedProvider: [HardhatNetworkProvider]
          },
          _gasLimit: 30000000
        },
        _provider: FixedGasProvider {
          _wrapped: AutomaticSenderProvider {
            _wrapped: [HardhatNetworkProvider],
            _wrappedProvider: [HardhatNetworkProvider]
          },
          _wrappedProvider: AutomaticSenderProvider {
            _wrapped: [HardhatNetworkProvider],
            _wrappedProvider: [HardhatNetworkProvider]
          },
          _gasLimit: 30000000
        },
        sendAsync: [Function: bound sendAsync],
        send: [Function: bound send],
        _sendJsonRpcRequest: [Function: bound _sendJsonRpcRequest] AsyncFunction
      },
      _eventLoopCache: [Object],
      _network: [Object]
    }
  },
  callStatic: {
    'approve(address,uint256)': [Function (anonymous)],
    'balanceOf(address)': [Function (anonymous)],
    'getApproved(uint256)': [Function (anonymous)],
    'isApprovedForAll(address,address)': [Function (anonymous)],
    'mint(string)': [Function (anonymous)],
    'name()': [Function (anonymous)],
    'ownerOf(uint256)': [Function (anonymous)],
    'safeTransferFrom(address,address,uint256)': [Function (anonymous)],
    'safeTransferFrom(address,address,uint256,bytes)': [Function (anonymous)],
    'setApprovalForAll(address,bool)': [Function (anonymous)],
    'supportsInterface(bytes4)': [Function (anonymous)],
    'symbol()': [Function (anonymous)],
    'tokenCount()': [Function (anonymous)],
    'tokenURI(uint256)': [Function (anonymous)],
    'transferFrom(address,address,uint256)': [Function (anonymous)],
    approve: [Function (anonymous)],
    balanceOf: [Function (anonymous)],
    getApproved: [Function (anonymous)],
    isApprovedForAll: [Function (anonymous)],
    mint: [Function (anonymous)],
    name: [Function (anonymous)],
    ownerOf: [Function (anonymous)],
    setApprovalForAll: [Function (anonymous)],
    supportsInterface: [Function (anonymous)],
    symbol: [Function (anonymous)],
    tokenCount: [Function (anonymous)],
    tokenURI: [Function (anonymous)],
    transferFrom: [Function (anonymous)]
  },
  estimateGas: {
    'approve(address,uint256)': [Function (anonymous)],
    'balanceOf(address)': [Function (anonymous)],
    'getApproved(uint256)': [Function (anonymous)],
    'isApprovedForAll(address,address)': [Function (anonymous)],
    'mint(string)': [Function (anonymous)],
    'name()': [Function (anonymous)],
    'ownerOf(uint256)': [Function (anonymous)],
    'safeTransferFrom(address,address,uint256)': [Function (anonymous)],
    'safeTransferFrom(address,address,uint256,bytes)': [Function (anonymous)],
    'setApprovalForAll(address,bool)': [Function (anonymous)],
    'supportsInterface(bytes4)': [Function (anonymous)],
    'symbol()': [Function (anonymous)],
    'tokenCount()': [Function (anonymous)],
    'tokenURI(uint256)': [Function (anonymous)],
    'transferFrom(address,address,uint256)': [Function (anonymous)],
    approve: [Function (anonymous)],
    balanceOf: [Function (anonymous)],
    getApproved: [Function (anonymous)],
    isApprovedForAll: [Function (anonymous)],
    mint: [Function (anonymous)],
    name: [Function (anonymous)],
    ownerOf: [Function (anonymous)],
    setApprovalForAll: [Function (anonymous)],
    supportsInterface: [Function (anonymous)],
    symbol: [Function (anonymous)],
    tokenCount: [Function (anonymous)],
    tokenURI: [Function (anonymous)],
    transferFrom: [Function (anonymous)]
  },
  functions: {
    'approve(address,uint256)': [Function (anonymous)],
    'balanceOf(address)': [Function (anonymous)],
    'getApproved(uint256)': [Function (anonymous)],
    'isApprovedForAll(address,address)': [Function (anonymous)],
    'mint(string)': [Function (anonymous)],
    'name()': [Function (anonymous)],
    'ownerOf(uint256)': [Function (anonymous)],
    'safeTransferFrom(address,address,uint256)': [Function (anonymous)],
    'safeTransferFrom(address,address,uint256,bytes)': [Function (anonymous)],
    'setApprovalForAll(address,bool)': [Function (anonymous)],
    'supportsInterface(bytes4)': [Function (anonymous)],
    'symbol()': [Function (anonymous)],
    'tokenCount()': [Function (anonymous)],
    'tokenURI(uint256)': [Function (anonymous)],
    'transferFrom(address,address,uint256)': [Function (anonymous)],
    approve: [Function (anonymous)],
    balanceOf: [Function (anonymous)],
    getApproved: [Function (anonymous)],
    isApprovedForAll: [Function (anonymous)],
    mint: [Function (anonymous)],
    name: [Function (anonymous)],
    ownerOf: [Function (anonymous)],
    setApprovalForAll: [Function (anonymous)],
    supportsInterface: [Function (anonymous)],
    symbol: [Function (anonymous)],
    tokenCount: [Function (anonymous)],
    tokenURI: [Function (anonymous)],
    transferFrom: [Function (anonymous)]
  },
  populateTransaction: {
    'approve(address,uint256)': [Function (anonymous)],
    'balanceOf(address)': [Function (anonymous)],
    'getApproved(uint256)': [Function (anonymous)],
    'isApprovedForAll(address,address)': [Function (anonymous)],
    'mint(string)': [Function (anonymous)],
    'name()': [Function (anonymous)],
    'ownerOf(uint256)': [Function (anonymous)],
    'safeTransferFrom(address,address,uint256)': [Function (anonymous)],
    'safeTransferFrom(address,address,uint256,bytes)': [Function (anonymous)],
    'setApprovalForAll(address,bool)': [Function (anonymous)],
    'supportsInterface(bytes4)': [Function (anonymous)],
    'symbol()': [Function (anonymous)],
    'tokenCount()': [Function (anonymous)],
    'tokenURI(uint256)': [Function (anonymous)],
    'transferFrom(address,address,uint256)': [Function (anonymous)],
    approve: [Function (anonymous)],
    balanceOf: [Function (anonymous)],
    getApproved: [Function (anonymous)],
    isApprovedForAll: [Function (anonymous)],
    mint: [Function (anonymous)],
    name: [Function (anonymous)],
    ownerOf: [Function (anonymous)],
    setApprovalForAll: [Function (anonymous)],
    supportsInterface: [Function (anonymous)],
    symbol: [Function (anonymous)],
    tokenCount: [Function (anonymous)],
    tokenURI: [Function (anonymous)],
    transferFrom: [Function (anonymous)]
  },
  filters: {
    'Approval(address,address,uint256)': [Function (anonymous)],
    'ApprovalForAll(address,address,bool)': [Function (anonymous)],
    'Transfer(address,address,uint256)': [Function (anonymous)],
    Approval: [Function (anonymous)],
    ApprovalForAll: [Function (anonymous)],
    Transfer: [Function (anonymous)]
  },
  _runningEvents: {},
  _wrappedEmits: {},
  address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  resolvedAddress: Promise {
    '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    [Symbol(async_id_symbol)]: 1922,
    [Symbol(trigger_async_id_symbol)]: 313,
    [Symbol(destroyed)]: { destroyed: false }
  },
  'approve(address,uint256)': [Function (anonymous)],
  'balanceOf(address)': [Function (anonymous)],
  'getApproved(uint256)': [Function (anonymous)],
  'isApprovedForAll(address,address)': [Function (anonymous)],
  'mint(string)': [Function (anonymous)],
  'name()': [Function (anonymous)],
  'ownerOf(uint256)': [Function (anonymous)],
  'safeTransferFrom(address,address,uint256)': [Function (anonymous)],
  'safeTransferFrom(address,address,uint256,bytes)': [Function (anonymous)],
  'setApprovalForAll(address,bool)': [Function (anonymous)],
  'supportsInterface(bytes4)': [Function (anonymous)],
  'symbol()': [Function (anonymous)],
  'tokenCount()': [Function (anonymous)],
  'tokenURI(uint256)': [Function (anonymous)],
  'transferFrom(address,address,uint256)': [Function (anonymous)],
  approve: [Function (anonymous)],
  balanceOf: [Function (anonymous)],
  getApproved: [Function (anonymous)],
  isApprovedForAll: [Function (anonymous)],
  mint: [Function (anonymous)],
  name: [Function (anonymous)],
  ownerOf: [Function (anonymous)],
  setApprovalForAll: [Function (anonymous)],
  supportsInterface: [Function (anonymous)],
  symbol: [Function (anonymous)],
  tokenCount: [Function (anonymous)],
  tokenURI: [Function (anonymous)],
  transferFrom: [Function (anonymous)]
}

```