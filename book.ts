const cardContainer:HTMLElement = document.getElementsByClassName("cards-container")[0] as HTMLElement;
const searchBox:HTMLElement = document.getElementsByClassName('search-box')[0] as HTMLElement;

const categoryList:string[]=['All'];

const createInputFeild = document.createElement('input');
createInputFeild.className='search-bar';
createInputFeild.type='text';
createInputFeild.placeholder='searching by author or category ...'
searchBox.appendChild(createInputFeild);

class BookDetails {
    
    protected title:string;
    protected author :string;
    protected category :string;
    protected isAvailable:boolean;

    constructor(title:string,author:string,category:string,isAvailable:boolean){
        this.title=title
        this.author=author
        this.category=category
        this.isAvailable=isAvailable
    
    }

    setTitle(title:string):void{this.title=title}
    setAuthor(author:string):void{this.author=author}
    setCategory(category:string):void{this.category=category}
    setIsAvailable(isAvailable:boolean):void{this.isAvailable=isAvailable}

    getTitle():string{return this.title}
    getAuthor():string{return this.author}
    getCategory():string{return this.category}
    getIsAvailable():boolean{return this.isAvailable}
}
class ReferenceBook extends BookDetails{
    private locationCode:string
    
    constructor(title:string,author:string,category:string,isAvailable:boolean, locationCode:string){
        super(title,author,category,isAvailable);
        this.locationCode=locationCode;
    }
    getLocationCode(){
        return this.locationCode
    }
    setLocationCode(locationCode:string){
        this.locationCode= locationCode
    }

}

class LibraryBooks {
    books: {title: string, author: string, category: string, isAvailable: boolean, locationCode:string}[] = [];
    filteredBooks: {title: string, author: string, category: string, isAvailable: boolean, locationCode:string}[] = [];
    static id:number =0
    addBook(title: string, author: string, category: string, isAvailable: boolean, locationCode:string) {

        this.books.push({
            
            title: title,
            author: author,
            category: category,
            isAvailable: isAvailable,
            locationCode:locationCode
        });
    }
    getBooks():ReferenceBook[] {
        return this.books.map(book => new ReferenceBook(book.title, book.author, book.category, book.isAvailable, book.locationCode));

    }
    removeBooke(index:number){
        this.books.splice(index,1)
    }
    searchBooks(searchValue:string){
        this.filteredBooks = this.books.filter((book)=> {
            return book.author.toLowerCase().includes(searchValue.toLowerCase()) || 
            book.category.toLowerCase().includes(searchValue.toLowerCase()) 
        } )
        
    }
    toggleAvailability(index:number){
        this.books[index].isAvailable= !this.books[index].isAvailable
    }
    filterByCategory(categoryValue:string): ReferenceBook[] {
        const filteredBooks = this.books.filter((book) => {
            return book.category.toLowerCase().includes(categoryValue.toLowerCase());
        });
        return filteredBooks.map(book => new ReferenceBook(book.title, book.author, book.category, book.isAvailable, book.locationCode));
    }


    cardShaping( index:number){
        const cardDive:HTMLElement = document.createElement('div');
        const cardH1:HTMLElement = document.createElement('h1');
        const cardp1:HTMLElement = document.createElement('p');
        const cardp2:HTMLElement = document.createElement('p');
        const cardp3:HTMLElement = document.createElement('p');
        const cardp4:HTMLElement = document.createElement('p');
        const cardButton:HTMLButtonElement = document.createElement('button');
        const deleteCardBTN:HTMLButtonElement = document.createElement('button')
        const showInfoBTN:HTMLButtonElement = document.createElement('button')

        
        showInfoBTN.innerHTML='info'
        showInfoBTN.className='info-BTN'

        const textNodeTitle = document.createTextNode(this.books[index].title)
        const textNodeAuthor = document.createTextNode(this.books[index].author)
        const textNodecategory = document.createTextNode(this.books[index].category)
        const textNodeIsAvailable =this.books[index].isAvailable ?
            document.createTextNode('available'):
            document.createTextNode('not available')

        const textNodeBTN = this.books[index].isAvailable ?
            document.createTextNode('change status to not available'):
            document.createTextNode('change status to available')
        deleteCardBTN.innerHTML='Delete'
        deleteCardBTN.className='delete-BTN'
        cardDive.className='card';

        cardH1.appendChild(textNodeTitle);
        cardp1.appendChild(textNodeAuthor)
        cardp2.appendChild(textNodecategory);
        cardp3.appendChild(textNodeIsAvailable);
        cardButton.appendChild(textNodeBTN);

        cardDive.appendChild(cardH1)
        cardDive.appendChild(cardp1)
        cardDive.appendChild(cardp2)
        cardDive.appendChild(cardp3)

        cardDive.appendChild(showInfoBTN)
        cardDive.appendChild(cardButton)
        cardDive.appendChild(deleteCardBTN)
        cardContainer.appendChild(cardDive)
        cardButton.addEventListener('click',()=>{
            libraryInstance.toggleAvailability(index);
            showCards('')
        })
        deleteCardBTN.addEventListener('click',()=>{
            libraryInstance.removeBooke(index)
            showCards('')
        })
        
    }
    

}


const libraryInstance = new LibraryBooks();


const showCards = (searchValue:string)=> {
    const booksArray:ReferenceBook[] =libraryInstance.getBooks()
    cardContainer.innerHTML='';
    if(booksArray.length>0){
        booksArray.map((card,index)=>{
            if(card.getAuthor().toLowerCase().includes(searchValue.toLowerCase()) || 
            card.getCategory().toLowerCase().includes(searchValue.toLowerCase()) ||
            card.getCategory().toLowerCase()===searchValue.toLowerCase() ){
                libraryInstance.cardShaping(index)
            }
            else if( searchValue.trim()==='' ||  searchValue.trim().toLowerCase()==='all'  ){
                libraryInstance.cardShaping(index)
            }
            
        })
    }else{
        const noBooksFound:HTMLElement = document.createElement('h1');
        noBooksFound.style.textAlign='center';
        noBooksFound.innerHTML='No Books Found...'
        cardContainer.appendChild(noBooksFound)
    }
}

showCards('');

createInputFeild.addEventListener('input',()=>{
    libraryInstance.searchBooks(createInputFeild.value);
    showCards(createInputFeild.value)
    libraryInstance.filteredBooks
})

const selectFeiled:HTMLSelectElement = document.createElement('select');

const createSelect = ()=>{
    selectFeiled.innerHTML=''
    selectFeiled.className='select'
    categoryList.map((val:string)=>{
        const option = document.createElement('option');
        option.value = val;
        option.innerHTML = val;
        selectFeiled.appendChild(option);
    })
    searchBox.appendChild(selectFeiled);
}
createSelect()

selectFeiled.addEventListener('change',()=>{
    cardContainer.innerHTML='';
    showCards(selectFeiled.value)
})


//// Bubble Bag


const inputs = document.querySelectorAll('.add-book-form input') 
const buttons = document.querySelectorAll('.add-book-form button');
let addBookForm = document.querySelector('.add-book-form')
let addBookBTN = document.querySelector('.add-book-BTN')

buttons[0]?.addEventListener('click',()=>{
    libraryInstance.addBook((inputs[0] as HTMLInputElement).value
        ,(inputs[1] as HTMLInputElement).value
        ,(inputs[2] as HTMLInputElement).value
        ,true
        ,(inputs[3] as HTMLInputElement).value
    );
    categoryList.push((inputs[2] as HTMLInputElement).value);
        const uniqueCategories = [...new Set(categoryList)];
        categoryList.length = 0;
        categoryList.push(...uniqueCategories);
    if (addBookForm) {
        addBookForm.className = 'add-book-form-hidden';
    }
    (inputs[0] as HTMLInputElement).value = '';
    (inputs[1] as HTMLInputElement).value='';
    (inputs[2] as HTMLInputElement).value='';
    (inputs[3] as HTMLInputElement).value='';
    createSelect();
    showCards('');
})
buttons[1]?.addEventListener('click',()=>{
    if (addBookForm) {
        addBookForm.className = 'add-book-form-hidden';
        (inputs[0] as HTMLInputElement).value = '';
        (inputs[1] as HTMLInputElement).value='';
        (inputs[2] as HTMLInputElement).value='';
        (inputs[3] as HTMLInputElement).value='';
    }
    showCards('');
})


addBookBTN?.addEventListener('click',()=>{
    if (addBookForm) {
        addBookForm.className = 'add-book-form';
    }
})
