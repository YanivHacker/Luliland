import React from 'react'
import ImageUploader from "react-images-upload";

export default function Home() {
  return (
    <>
      <div>Home</div>
      <ImageUploader withIcon={false}
                     withPreview={true}
                     label=""
                     buttonText="Upload Images"
                     onChange={this.onDrop}
                     imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                     maxFileSize={1048576}
                     fileSizeError=" file size is too big" />
    </>
  )
}
