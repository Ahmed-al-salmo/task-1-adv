"use strict";
const cardContainer = document.getElementsByClassName("cards-container")[0];
const searchBox = document.getElementsByClassName('search-box')[0];
const categoryList = ['All'];
const createInputFeild = document.createElement('input');
createInputFeild.className = 'search-bar';
createInputFeild.type = 'text';
createInputFeild.placeholder = 'searching by author or category ...';
searchBox.appendChild(createInputFeild);
class BookDetails {
    title;
    author;
    category;
    isAvailable;
    constructor(title, author, category, isAvailable) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.isAvailable = isAvailable;
    }
    setTitle(title) { this.title = title; }
    setAuthor(author) { this.author = author; }
    setCategory(category) { this.category = category; }
    setIsAvailable(isAvailable) { this.isAvailable = isAvailable; }
    getTitle() { return this.title; }
    getAuthor() { return this.author; }
    getCategory() { return this.category; }
    getIsAvailable() { return this.isAvailable; }
}
class ReferenceBook extends BookDetails {
    locationCode;
    constructor(title, author, category, isAvailable, locationCode) {
        super(title, author, category, isAvailable);
        this.locationCode = locationCode;
        // categoryList.push(category);
        // categoryList.push(category);
        // const uniqueCategories = [...new Set(categoryList)];
        // categoryList.length = 0;
        // categoryList.push(...uniqueCategories);
        // console.log(categoryList)
    }
    getLocationCode() {
        return this.locationCode;
    }
    setLocationCode(locationCode) {
        this.locationCode = locationCode;
    }
}
class LibraryBooks {
    books = [];
    filteredBooks = [];
    static id = 0;
    addBook(title, author, category, isAvailable, locationCode) {
        this.books.push({
            title: title,
            author: author,
            category: category,
            isAvailable: isAvailable,
            locationCode: locationCode
        });
    }
    getBooks() {
        return this.books.map(book => new ReferenceBook(book.title, book.author, book.category, book.isAvailable, book.locationCode));
    }
    removeBooke(index) {
        this.books.splice(index, 1);
    }
    searchBooks(searchValue) {
        this.filteredBooks = this.books.filter((book) => {
            return book.author.toLowerCase().includes(searchValue.toLowerCase()) ||
                book.category.toLowerCase().includes(searchValue.toLowerCase());
        });
    }
    toggleAvailability(index) {
        this.books[index].isAvailable = !this.books[index].isAvailable;
    }
    filterByCategory(categoryValue) {
        const filteredBooks = this.books.filter((book) => {
            return book.category.toLowerCase().includes(categoryValue.toLowerCase());
        });
        return filteredBooks.map(book => new ReferenceBook(book.title, book.author, book.category, book.isAvailable, book.locationCode));
    }
    cardShaping(index) {
        const cardDive = document.createElement('div');
        const cardH1 = document.createElement('h1');
        const cardp1 = document.createElement('p');
        const cardp2 = document.createElement('p');
        const cardp3 = document.createElement('p');
        const cardp4 = document.createElement('p');
        const cardButton = document.createElement('button');
        const deleteCardBTN = document.createElement('button');
        const showInfoBTN = document.createElement('button');
        showInfoBTN.innerHTML = 'info';
        showInfoBTN.className = 'info-BTN';
        const textNodeTitle = document.createTextNode(this.books[index].title);
        const textNodeAuthor = document.createTextNode(this.books[index].author);
        const textNodecategory = document.createTextNode(this.books[index].category);
        const textNodeIsAvailable = this.books[index].isAvailable ?
            document.createTextNode('available') :
            document.createTextNode('not available');
        const textNodeBTN = this.books[index].isAvailable ?
            document.createTextNode('change status to not available') :
            document.createTextNode('change status to available');
        deleteCardBTN.innerHTML = 'Delete';
        deleteCardBTN.className = 'delete-BTN';
        cardDive.className = 'card';
        cardH1.appendChild(textNodeTitle);
        cardp1.appendChild(textNodeAuthor);
        cardp2.appendChild(textNodecategory);
        cardp3.appendChild(textNodeIsAvailable);
        cardButton.appendChild(textNodeBTN);
        cardDive.appendChild(cardH1);
        cardDive.appendChild(cardp1);
        cardDive.appendChild(cardp2);
        cardDive.appendChild(cardp3);
        cardDive.appendChild(showInfoBTN);
        cardDive.appendChild(cardButton);
        cardDive.appendChild(deleteCardBTN);
        cardContainer.appendChild(cardDive);
        cardButton.addEventListener('click', () => {
            libraryInstance.toggleAvailability(index);
            showCards('');
        });
        deleteCardBTN.addEventListener('click', () => {
            libraryInstance.removeBooke(index);
            showCards('');
        });
    }
}
const libraryInstance = new LibraryBooks();
const showCards = (searchValue) => {
    const booksArray = libraryInstance.getBooks();
    cardContainer.innerHTML = '';
    if (booksArray.length > 0) {
        booksArray.map((card, index) => {
            if (card.getAuthor().toLowerCase().includes(searchValue.toLowerCase()) ||
                card.getCategory().toLowerCase().includes(searchValue.toLowerCase()) ||
                card.getCategory().toLowerCase() === searchValue.toLowerCase()) {
                libraryInstance.cardShaping(index);
            }
            else if (searchValue.trim() === '' || searchValue.trim().toLowerCase() === 'all') {
                libraryInstance.cardShaping(index);
            }
        });
    }
    else {
        const noBooksFound = document.createElement('h1');
        noBooksFound.style.textAlign = 'center';
        noBooksFound.innerHTML = 'No Books Found...';
        cardContainer.appendChild(noBooksFound);
    }
};
showCards('');
createInputFeild.addEventListener('input', () => {
    console.log(createInputFeild.value.trim() === '');
    libraryInstance.searchBooks(createInputFeild.value);
    showCards(createInputFeild.value);
    libraryInstance.filteredBooks;
});
const selectFeiled = document.createElement('select');
const createSelect = () => {
    selectFeiled.innerHTML = '';
    selectFeiled.className = 'select';
    categoryList.map((val) => {
        const option = document.createElement('option');
        option.value = val;
        option.innerHTML = val;
        selectFeiled.appendChild(option);
    });
    searchBox.appendChild(selectFeiled);
};
createSelect();
// selectFeiled.className='select'
// categoryList.map((val:string)=>{
//     const option = document.createElement('option');
//     option.value = val;
//     option.innerHTML = val;
//     selectFeiled.appendChild(option);
// })
// searchBox.appendChild(selectFeiled);
selectFeiled.addEventListener('change', () => {
    cardContainer.innerHTML = '';
    showCards(selectFeiled.value);
});
//// Bubble Bag
const inputs = document.querySelectorAll('.add-book-form input');
const buttons = document.querySelectorAll('.add-book-form button');
let addBookForm = document.querySelector('.add-book-form');
let addBookBTN = document.querySelector('.add-book-BTN');
buttons[0]?.addEventListener('click', () => {
    libraryInstance.addBook(inputs[0].value, inputs[1].value, inputs[2].value, true, inputs[3].value);
    categoryList.push(inputs[2].value);
    const uniqueCategories = [...new Set(categoryList)];
    categoryList.length = 0;
    categoryList.push(...uniqueCategories);
    console.log(categoryList);
    if (addBookForm) {
        addBookForm.className = 'add-book-form-hidden';
    }
    createSelect();
    showCards('');
});
buttons[1]?.addEventListener('click', () => {
    if (addBookForm) {
        addBookForm.className = 'add-book-form-hidden';
    }
    showCards('');
});
addBookBTN?.addEventListener('click', () => {
    if (addBookForm) {
        addBookForm.className = 'add-book-form';
    }
});
