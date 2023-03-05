# Snipd 🔫

## Problem Statement / Motivation

With all the browsers and internet, information access is all available through mostly websites and ebooks (in browser readable PDF format). To keep track of collective information buried in parts across multiple websites and documents can be challenging, especially when researching a topic. However, as the number of highlights increases, it can become cluttered and challenging to keep track of them, while also staying focused.

#### User Story
 > While preparing for our semester-end exams by studying from multiple sources like PDFs, websites, etc- making notes, highlighting important points, maintaining track of all sources  and share is all done manually and can be a bit of an over-work, but we still end up doing it because its easier to revise if everything is in one place.

## _Annoting and storing text, images and links made easier_

Snipd is a note collecting browser extension which stores all the highlighted texts, images from PDFs/websites, links, and notes. All these snippets are stored within multiple collections where each collection is focused for a specific topic. Through a central collection page, They can be managed and quickly browsed with support for exporting to PDFs.

## Features

- Save any form of text including PDF files.
- Cross platform extension.
- Categorise them and arrange them.
- Search through the saved snippets.
- Records all the other meta data about the snippet that might come handy later.
- Export documents as PDF.

## Use cases

- Useful while studying and making notes when you're having multiple resources to read from.
- Storing interesting quotes or dialogues while reading.
- Easily arrange the snippets based on their categories so it becomes personalised.
- Useful meta data in the save snippets will help you revisit the files or pages from where you initially highlighted the text/image.

## Build

Firstly, clone the repo 
```
git clone https://github.com/PDFilez/snipd.git
```
and then cd into the folder and do :
```
npm install
```
followed by to build up the `popup` and `notes_page` and forward the output to extension directory (all commands are run in root directory and works because npm workspaces)
```
npm run buildall
```
When the first build is done, Open `chrome://extensions` in your chrome browser and set the developer mode as on, Install the extension by `Loading Unpacked` and selecting the `./extension` directory. This process can be skipped in subsequent builds and Just use reload button in the extension page for each new subsequent build.


## How to use

- Highlight the required text from the pdf/website and for images and links, Use context menu option to add the selected item to collection.
- Use the popup that appears to customize the snippet.
![](./assets/popupSS.png)
- In the "Central page" which can be accessed from extension context menu > options or Selecting Central Page in popup, which is the place where collections and its snippets are managed
![](./assets/centralPage.png)

- In the screenshot above:
    - `1` corresponds to the **search bar** feature through which the user can easily search for the content via just typing the query.
    - `2` corresponds to the various category collections. Exam category could have snippets having important notes saved by the user for a particular exam, etc.


## Timeline of the project 
- Initial idea was to keep track of annotations/snippets across PDF files, but later extended to web pages too. This project was built from scratch using the Browser Extension API and React for UI.
- At the moment, all the core features are implemented which acts as a base for further improvements, althought they require some polishing, as well as more improvements via user feedback.
- Initial goal was for the extension to be compatible with all mordern browsers (Chromium based browsers, Firefox) but later realized that they were all incompatible with eachother, with Chrome being the most feature rich, hence Chrome(Manifest v3) was alone choosen, with future plans of cross browser compatibility.
- For development conviniences, `npm workspaces` were used for a shared build system and packages. For `react`- `vite` was chosen as the bundler, for its faster debug compilation speeds.
- From here on, the project was divided into three sub-projects which were parallely worked upon
  - the core extension
  - popup UI (main flow of making a new snippet)
  - options page (central collection and management of all snippets)
- Intergration between these components required a central source of truth, and `chrome.storage` was used. This resulted into first working prototype, which acted as a base for all future enhancements.
- Finally, few polishing and quality-of-life enhancements were made.


## License

MIT License.

**Free Software, Hell Yeah!**
