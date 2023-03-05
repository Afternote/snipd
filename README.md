# Snipd 🔫

## Problem Statement / Motivation

In today's digital age, we have access to vast amounts of information that are available in the form of PDFs, articles, and web pages. However, keeping track of important information buried within lengthy documents can be challenging. Many people often read and highlight important lines and quotes while reading PDFs or articles online. However, as the number of highlights increases, it can become cluttered and challenging to keep track of them. 

#### Real life scenario
 > We were preparing for our Semester end Exams and studying from multiple sources like PDFs, Websites, etc. To make notes, We used to highlight useful information and then write them down in our notebooks. It's a very tedious process, but we have to do it because it's easier to revise if everything is in one place. What if there was an app that stores all the highlights from different sources in a centralized system 🤔. 

There is currently no centralized system that stores highlights, links, images, and other information from various sources in one place. Therefore, there is a need for a platform that can compile and organize these highlights into a single page, making it easier for users to navigate through their highlighted content. The solution should be designed to improve productivity and efficiency for individuals who rely on reading and extracting essential information from various sources.

## _Annoting and storing text, images and links made easier_

Snipd is a note collecting browser extension which supports highlighting of texts from PDFs/websites, images by URL, links and notes. Once a collection is done. You will be able to manage all the collections on a dedicated central page - where all the snippets are stored. Additionally, it can be 
exported via PDF.

## Features

- Save any form of text including PDF files.
- Cross platform extension.
- Categorise them and arrange them.
- Search through the saved snippets.
- Records all the other meta data about the snippet that might come handy later.
- Export documents as PDF

## Use cases

- Useful while studying and making notes when you're having multiple resources to read from.
- Storing interesting quotes or dialogues while reading.
- Easily arrange the snippets based on their categories so it becomes personalised.
- Useful meta data in the save snippets will help you revisit the files or pages from where you initially highlighted the text/image.

## How to use

- The first step would be to highlight the required text from the pdf/website.
For images and links, an option to add the selected item to collection is available.
- After selecting the text, click on the extension button and a pop-up will appear with the following options.
![](./assets/popupSS.png)

- On clicking the central page, you will be led to the page where all the text,images,links and notes are saved.
![](./assets/centralPage.png)

- In the screenshot above:
    - 1 corresponds to the **search bar** feature through which the user can easily search for the content via just typing the query.
    - 2 corresponds to the various category collections. Exam category could have snippets having important notes saved by the user for a particular exam, etc.


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


## Build

Firstly, clone the repo 
```
git clone https://github.com/PDFilez/snipd.git
```
and then cd into the folder and do :
```
npm install
```
followed by :
```
npm run buildall
```
When the build finishes. Open 'chrome://extensions/' and set the developer mode as on.

After which you will be able to try and test the extension.
## License

MIT

**Free Software, Hell Yeah!**
