import BlockQuoteIcon from "../assets/icons/BlockQuoteIcon";
import PhotoIcon from "../assets/icons/PhotoIcon";
import UnlinkIcon from "../assets/icons/UnlinkIcon";
import NoteIcon from "../assets/icons/NoteIcon";

const links = [
  { icon: BlockQuoteIcon, label: "Text", notifications: 3, type: "text" },
  { icon: PhotoIcon, label: "Images", notifications: 4, type: "image" },
  { icon: UnlinkIcon, label: "Links", type: "link" },
  { icon: NoteIcon, label: "Notes", type: "note" },
];

export default links;
