# **Example Rush Repository** 

A basic example of showing how to manage, setup and work on monorepository with [Rush.js](https://rushjs.io/).

```
example-rush
├── apps
│   └── example-calculator
│       └── package.json
│           ├── example-components
│           └── example-math
└── libs
    ├── example-components
    └── example-math
```

## **Setup**
Manually:

1. install rush
```sh
npm install @microsoft/rush -g
```

2. Install dependencies
```sh
rush update
```

3. Navigate to example app
```sh
cd apps/example-calculator
```

4. Run react.js app
```sh
rushx start
```

Docker:


## **Trace**

1. Init rush
2. Add libs
3. Add application
4. Register rush references
5. Link libs in app
6. Build
7. Run