//promenjive iz DOM-a
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task')

//Poziva se funkcija koja pokrece osluskivace dogadjaja
loadEventListeners();

//definise event listere
function loadEventListeners(){ 
    //dodaje osluskivac za submit, koji pokrece callback funkciju addTask
    form.addEventListener('submit', addTask);
    //  Osluskivac dogadjaja za uklanjanje zadatka, aktivira se na click, pokrece removeTask calback funkciju
    taskList.addEventListener('click', removeTask);  
    //osluskivac dogadjaja koji se poziva na click, pokrece callback funkcija clearTasks, koja uklanja sve zadatke
    clearBtn.addEventListener('click', clearTasks);
    //filter za kucanje
    filter.addEventListener('keyup', filterTasks)
}
//Funkcija dodaje zadatak
function addTask(e){
    //ako je prazan, kaze da se doda
    if(taskInput.value===''){
        alert('Add a taks');
    }
    //dodaje li element u html-u
    const li=document.createElement('li');
    //dodaje klasu collection-item
    li.className='collection-item'; 
    //dodaje tekstualni sadrzaj u html iz input
    li.appendChild(document.createTextNode(taskInput.value)); 
//kreira lik element a
    const link=document.createElement('a');
    //dodaje mu klasu 
    link.className='delete-item secondary-content'; 
//dodaje mu unutrasnji html
    link.innerHTML='<i class="fa fa-remove"></i>';
//dodaje dete
    li.appendChild(link);
    //dodaje dete
    taskList.appendChild(li);
//kada dodamo, ovo treba da isprazni sadrzaj
    taskInput.value=''; 

//sprecavamo refresovanje sajta
    e.preventDefault(e);
}

//Funkcija koja brise zadatak
function removeTask(e){
    //dodajemo if proveru, da bi se targetirao samo iskic za brisanje
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Da li ste sigurni")){
      e.target.parentElement.parentElement.remove();
    }
}} 

//Funkcija koja brise sve zadatke
function clearTasks(){
    // taskList.innerHTML=''; //
    //malo brzi nacin
    while(taskList.firstChild){ //petlja radi dok ima prvog deteta
      taskList.removeChild(taskList.firstChild); //uklanja prvo dete taskliste, to radi dokle god se ne izbrisu sva deca
    }
}

//filtrira zadatke prema pojmu koji smo ukucali
function filterTasks(e){ 
    const text=e.target.value.toLowerCase(); //sve prebacuje u mala slova radi uporedjivanja striga

 document.querySelectorAll('.collection-item').forEach( //prolazi kroz sve html elemente sa klasom .collection-item
     function(task){ //parametar je task
         const item=task.firstChild.textContent; //smesta u item konstantu sadrzaj prvog deteta
         if(item.toLowerCase().indexOf(text)!=-1){ //ako je indeks clana niza nije -1 odnosno ne postoji u nizu
        task.style.display='block'; //prikazuje ga u html-u jer je block prikazan
         }
         else{ //ako nije vec je -1, sto znaci da ga nema u nizu, prikazuje se none
             task.style.display='none';
         }
     }
 )
    
}