import { writable } from 'svelte/store';


export let screenIndex = writable(0);
export let courseID = writable('');
export let subjectID = writable('');
export let courseTitle = writable('');
export let subjectTilte = writable('');

export let notes = writable([]);
export let player = writable('');


let noteDefault = {
  content: "",
  hide: false,
  id: "",
  index: 1,
  linkin: "",
  linkout: "",
  mark: 0,
  name: "",
  order: '',
  player: "",
  remark: "",
  subject: ""  
}
export let note = writable(noteDefault);

export let screenID = writable('NoteView');
export let isNew = writable(false);
export let currentNoteIndex = writable(null)
export let editedContent = writable('')
export let focus = writable({
  order: false,
  name: false,
  content: false
})