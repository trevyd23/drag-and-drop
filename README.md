# Drag and Drop Component Library For React

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

[![npm version](https://badge.fury.io/js/@trevyd23/drag-and-drop.svg)](https://www.npmjs.com/package/@trevyd23/drag-and-drop)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

Welcome to our custom drag-and-drop media upload component library! This library allows clients to easily implement drag-and-drop functionality for uploading images and media to a designated drop zone. Users can also upload media directly from their devices using a file input.

## Features

- Drag and drop images and media files into a specified drop zone.
- Upload media files from your device using a file input.
- Customizable styles and appearance.
- Built-in event handlers for handling file drops and uploads.performance.
- Out of the box modal type to allow for ease of use in typical user flows.
- Built with TailwindCSS under the hood.

## Installation

Install the library via npm or yarn:

```bash
npm install @trevyd23/drag-and-drop
```

Or with yarn:

```bash
yarn add @trevyd23/drag-and-drop
```

## Examples

Here is a simple example of drag-and-drop being used in an app with some custom styles:

```

import React, { ChangeEvent, useRef, useState } from 'react'
import './App.css'
import { DragAndDrop } from '@trevyd23/drag-and-drop'



const App = ():React.ReactElement => {

  const dragRef = useRef(null)
  const [imageSource, setImageSource] = useState('')
  const [show, setShow] = useState(true)

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {

    //Consider using a CDN service for the persisting of files logic here

    if (event.currentTarget.files && event.currentTarget.files[0]) {
        setImageSource(URL.createObjectURL(event.currentTarget.files[0]))
    }

}

  return (<div id="main">
    <DragAndDrop
      dropzoneRef={dragRef}
      buttonLabel='Choose file'
      closeOnClickOutside
      header='Upload an image'
      handleSubmit={(e) => console.log(e)}
      handleFileUpload={handleFileUpload}
      imageSourceState={imageSource}
      setImageSourceState={setImageSource}
      setVisible={setShow}
      typeLimitationsDescription='Works with any .PNG, .JPG file from your device.'
      onDragEnter={(e) => console.log(e)}
      onDragLeave={(e) => console.log(e)}
      onDragOver={(e) => console.log(e)}
      onDrop={(e) => console.log(e)}
      subHeader='Drag and drop your image here to upload'
      typeAccepts='image/png, image/jpeg'
      key={'someKey'}
      visible={show}
      type='modal' />
      </div>
  )
}

export default App

```


