// import React from 'react';
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import Editor from "ckeditor5-custom-build";
// const editorConfiguration = {
//     toolbar: [
//         'heading',
//         '|',
//         'bold',
//         'italic',
//         'link',
//         'bulletedList',
//         'numberedList',
//         '|',
//         'outdent',
//         'indent',
//         '|',
//         'imageUpload',
//         'blockQuote',
//         'insertTable',
//         'mediaEmbed',
//         'undo',
//         'redo'
//     ],

//     simpleUpload: {
//         // The URL that the images are uploaded to.
//         uploadUrl: 'http://127.0.0.1:8000/retail/api/v1/market/1/upload-image',

//         // // Enable the XMLHttpRequest.withCredentials property.
//         withCredentials: true,

//         // // Headers sent along with the XMLHttpRequest to the upload server.
//         // headers: {
//         //     'X-CSRF-TOKEN': 'CSRF-Token',
//         //     Authorization: 'Bearer <JSON Web Token>'
//         // }
//     }
// };
// const CustomEditor = (props: any) => {
//     return (
//         <CKEditor
//             editor={Editor}
//             config={editorConfiguration}
//             data={props.initialData}
//             onChange={(event, editor) => {
//                 const data = editor.getData();
//                 console.log({ event, editor, data });
//             }}
//         />
//     )
// }

// export default CustomEditor