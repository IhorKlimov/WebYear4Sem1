# mui-chat-box

React component for creating a simple chat box.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](hhttps://github.com/kevbite/mui-chat-box/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/mui-chat-box/latest.svg)](https://www.npmjs.com/package/mui-chat-box)
[![npm downloads](https://img.shields.io/npm/dm/mui-chat-box.svg)](https://www.npmjs.com/package/mui-chat-box)

[Demo](https://kevsoft.net/mui-chat-box/)
[![mui-chat-box preview](/preview.gif)](https://kevsoft.net/mui-chat-box/)

## Getting Started

### Installing Package

**mui-chat-box** can be installed directly via npm by executing the following command:

```powershell
npm install mui-chat-box
```

## Usage

```jsx
import { Avatar } from "@mui/material";
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";

export const App = () => (<ChatBox>
  <ReceiverMessage avatar={<Avatar>KS</Avatar>}>
    Hello how are you?
  </ReceiverMessage>
  <SenderMessage avatar={<Avatar>NA</Avatar>}>
    I'm good thanks you?
  </SenderMessage>
  <ReceiverMessage avatar={<Avatar>KS</Avatar>}>
    I'm good too!
  </ReceiverMessage>
</ChatBox>)
```

## Samples

The [react-example](packages/apps/react-example) folder contains an example of how you could use the mui-chat-box.

## Contributing

1. Issue
1. Fork
1. Hack!
1. Pull Request
