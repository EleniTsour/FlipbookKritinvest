
```md
# React PDF Flipbook Viewer

This project is a React-based PDF flipbook viewer that allows users to view PDF documents in a flipbook format. It is built using Next.js and various other libraries to provide a seamless and interactive experience.
Here is the codesandbox Link-

https://codesandbox.io/p/github/mohitkumawat310/react-pdf-flipbook-viewer/master?import=true

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

- **Flipbook Navigation**: Navigate through the PDF pages using flipbook-style animations.
- **Zoom and Pan**: Zoom in and out of the pages and pan around for better viewing.
- **Fullscreen Mode**: Toggle fullscreen mode for an immersive reading experience.
- **Keyboard Shortcuts**: Use keyboard arrows to navigate through the pages.
- **Responsive Design**: Optimized for various screen sizes.

## Components

### FlipbookViewer

| Prop          | Type      | Description                                      |
|---------------|-----------|--------------------------------------------------|
| `pdfUrl`      | `string`  | URL of the PDF document to be displayed.         |
| `shareUrl`    | `string`  | URL to be used for sharing the document.         |
| `className`   | `string`  | Additional CSS classes for styling.              |
| `disableShare`| `boolean` | Flag to disable the share button.                |

### Toolbar

| Prop            | Type       | Description                                      |
|-----------------|------------|--------------------------------------------------|
| `flipbookRef`   | `object`   | Reference to the flipbook component.             |
| `containerRef`  | `object`   | Reference to the container element.              |
| `screenfull`    | `object`   | Screenfull instance for fullscreen functionality.|
| `pdfDetails`    | `object`   | Details of the PDF document (total pages, etc.). |
| `viewerStates`  | `object`   | State of the viewer (current page, zoom scale).  |
| `shareUrl`      | `string`   | URL to be used for sharing the document.         |
| `disableShare`  | `boolean`  | Flag to disable the share button.                |

### Flipbook

| Prop            | Type       | Description                                      |
|-----------------|------------|--------------------------------------------------|
| `viewerStates`  | `object`   | State of the viewer (current page, zoom scale).  |
| `setViewerStates`| `function`| Function to update the viewer state.             |
| `flipbookRef`   | `object`   | Reference to the flipbook component.             |
| `pdfDetails`    | `object`   | Details of the PDF document (total pages, etc.). |

### SliderNav

| Prop            | Type       | Description                                      |
|-----------------|------------|--------------------------------------------------|
| `flipbookRef`   | `object`   | Reference to the flipbook component.             |
| `pdfDetails`    | `object`   | Details of the PDF document (total pages, etc.). |
| `viewerStates`  | `object`   | State of the viewer (current page, zoom scale).  |

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Special Thanks

Special thanks to the following libraries that made this project possible:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [react-pdf](https://github.com/wojtekmaj/react-pdf)
- [react-pageflip](https://github.com/Nodlik/react-pageflip)
- [react-zoom-pan-pinch](https://github.com/prc5/react-zoom-pan-pinch)
- [screenfull](https://github.com/sindresorhus/screenfull.js)
- [radix-ui](https://www.radix-ui.com/)
- [tailwindcss](https://tailwindcss.com/)
- [class-variance-authority](https://github.com/joe-bell/class-variance-authority)
- [clsx](https://github.com/lukeed/clsx)
- [lucide-react](https://github.com/lucide-icons/lucide)
- [keyboardjs](https://github.com/RobertWHurst/KeyboardJS)
- [react-share](https://github.com/nygardk/react-share)
- [sonner](https://github.com/emilkowalski/sonner)
