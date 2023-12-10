import React, { MouseEventHandler, useEffect } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5"
import { IoIosClose } from "react-icons/io"


export type ComponentType = 'modal' | 'normal'
export interface Props {
  type: ComponentType,
  dropzoneRef: React.RefObject<HTMLDivElement>,
  visible: boolean,
  imageSourceState: string,
  header: string,
  subHeader: string,
  buttonLabel: string,
  typeLimitationsDescription: string,
  typeAccepts: string,
  handleSubmit: MouseEventHandler<HTMLButtonElement>,
  setImageSourceState: React.Dispatch<React.SetStateAction<string>>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  handleFileUpload: React.ChangeEventHandler<HTMLInputElement>,
  onDragEnter: React.DragEventHandler<HTMLDivElement>,
  onDragOver: React.DragEventHandler<HTMLDivElement>,
  onDragLeave: React.DragEventHandler<HTMLDivElement>,
  onDrop: React.DragEventHandler<HTMLDivElement>,
  closeOnClickOutside: boolean,
  CustomComponent?: React.ElementType<{
    className?: string,
    onDragEnter?: React.DragEventHandler<HTMLDivElement>,
    onDragOver?: React.DragEventHandler<HTMLDivElement>,
    onDragLeave?: React.DragEventHandler<HTMLDivElement>,
    onDrop?: React.DragEventHandler<HTMLDivElement>,
    ref?: React.RefObject<HTMLDivElement>,
  }>
}

const DragAndDrop = ({ dropzoneRef,
  visible,
  setVisible,
  type,
  header,
  subHeader,
  buttonLabel,
  typeLimitationsDescription,
  closeOnClickOutside,
  typeAccepts,
  handleSubmit,
  imageSourceState,
  setImageSourceState,
  CustomComponent,
  handleFileUpload,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop }: Props):React.ReactElement => {


  useEffect(() => {
    if (closeOnClickOutside) {
      const handleOutSideClick = (event: MouseEvent) => {
        if (!dropzoneRef.current?.contains(event.target as Node)) {
          setVisible(false)
        }
      }

      window.addEventListener("mousedown", handleOutSideClick)

      return () => {
        window.removeEventListener("mousedown", handleOutSideClick)
      }
    }
  }, [dropzoneRef])


  return (
    <>
      {visible && (
        <React.Fragment>
          {CustomComponent !== undefined ? (
            <React.Fragment>
              {type === 'modal' ?
                (<div className='bg-[#262626cc] w-screen h-screen z-40 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
                  <CustomComponent />
                </div>) : (<CustomComponent />)
              }</React.Fragment>) :
            (<div className='bg-[#262626cc] w-screen h-screen z-40 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
              <section className='bg-white w-[22rem] sm:w-[28rem] h-80 rounded-sm relative px-5' ref={dropzoneRef}>

                <div className='w-full flex flex-row items-center justify-between mt-5'>
                  <h1 className='font-bold'>{header ? header : `Upload an image.`}</h1>
                  <button onClick={() => setVisible(!visible)}>
                    <IoIosClose className='w-6 h-6 text-black' />
                  </button>
                </div>

                <div className={`w-full h-1 bg-[#EEEEEE] mt-5 lg:hidden`} />

                <div className={`w-full h-48 ${imageSourceState === '' ? 'bg-[#EEEEEE]' : 'bg-white'} flex flex-col items-center justify-center mt-5 rounded-sm gap-3`}
                  onDragEnter={onDragEnter}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >

                  {imageSourceState === '' ? (
                    <>
                      <IoCloudUploadOutline className='w-8 h-8 text-black' />

                      <h2 className='font-medium hidden md:flex '>{subHeader ? subHeader : `Drag and drop your image here to upload`}</h2>

                      <p className='font-light text-xs'>{typeLimitationsDescription ? typeLimitationsDescription : `Works with any .PNG, .JPG file from your device`}</p>
                    </>
                  ) : (
                    <img
                      alt='uploadedImage'
                      src={imageSourceState}
                      className='h-32 w-32 rounded-full'
                      width={100}
                      height={100}
                    />)
                  }
                  {imageSourceState === '' ? (
                    <div className='fileUploadButton'>
                      <label className='text-sm'>
                        {buttonLabel ? buttonLabel : 'Choose file'}
                        <input
                          id="fileSelect"
                          type="file"
                          multiple={false}
                          className='hidden'
                          onChange={handleFileUpload}
                          accept={typeAccepts ? typeAccepts : "image/png, image/jpeg"}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className='w-full items-center flex flex-row justify-between px-5 md:gap-5'>
                      <button className='md:w-48 w-32 h-12 flex items-center justify-center bg-black text-white hover:bg-zinc-900 text-lg font-semibold rounded-md' onClick={handleSubmit}>
                        Confirm
                      </button>

                      <button className='md:w-48 w-32 h-12 flex items-center justify-center bg-[#EEEEEE] text-black text-lg font-semibold rounded-md hover:bg-gray-400' onClick={() => setImageSourceState('')}>
                        Cancel
                      </button>

                    </div>)
                  }

                </div>

              </section>

            </div>)}
        </React.Fragment>)
      }
    </>)
}

export default DragAndDrop