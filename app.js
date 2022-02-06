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
    //dodaje se osluskivac na ucitavanje DOM-a, da se tada upisu zadaci iz storidza
    document.addEventListener('DOMContentLoaded', getTasks);
    //dodaje osluskivac za submit, koji pokrece callback funkciju addTask
    form.addEventListener('submit', addTask);
    //  Osluskivac dogadjaja za uklanjanje zadatka, aktivira se na click, pokrece removeTask calback funkciju
    taskList.addEventListener('click', removeTask);  
    //osluskivac dogadjaja koji se poziva na click, pokrece callback funkcija clearTasks, koja uklanja sve zadatke
    clearBtn.addEventListener('click', clearTasks);
    //filter za kucanje, pokrece se na svako pustanje dugmeta, filterTasks treba da filtrira pretragu
    filter.addEventListener('keyup', filterTasks)
}
//funkcija koja dodaje zadatke iz localstoridza
function getTasks(){
    let tasks; //inicijalizujemo promenjivu tasks
    if (localStorage.getItem('tasks')===null){ //proveravamo ima li icega u storidzu
        tasks=[]; //ako nema dodeljuje se zadacima prazan niz
    }
    else{ //ako ima dodeljuju mu se zadaci iz storidza, pretvoreni u objekat/niz
        tasks=JSON.parse(localStorage.getItem('tasks')); 
    }
    //prolazimo kroz niz sa elementima pokupljenim iz storidza, i pravimo HTML elemente sa zadacima
    tasks.forEach((task)=>{
    
        const li=document.createElement('li'); //pravimo li HTML element
        li.className='collection-item';//dodajemo mu klasu collection-item, koristimo je za sve zadatke
        li.appendChild(document.createTextNode(task));//dodajemo zadatak unutar njega iz elementa kroz koji je prosla petlja
        const link=document.createElement('a');//pravi se link a
        link.className='delete-item secondary-content'; //dodajemo mu css klase
        link.innerHTML='<i class="fa fa-remove"></i>'; //dodajemo font awsome ikonicu za brisanje
        li.appendChild(link); //dodaje se link kao dete li elementu
        taskList.appendChild(li); //dodaje se link u ul


    })
}

//Funkcija dodaje zadatak
function addTask(e){ //parametar je e, sto je skracenica od event
        //if proverava da li je vrednost inputa prazna, ako jeste kaze da se doda zadatak
        if(taskInput.value===''){
            alert('Upišite zadatak, ništa nije upisano');
            return; //prekida funkciju tokom izvrsavanja, i sprecava da se napravi prazan li element
        }
        //kreira se html element li i a...
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

    //poziva se funkcija koja dodaje upisani zadatak u Local Storage
    storeTaskInLocalStorage(taskInput.value); //uzima vrednost iz inputa i prosledjuje je funkciji kao argument

    //kada dodamo, ovo treba da isprazni sadrzaj
        taskInput.value=''; 

    //sprecavamo refresovanje sajta kada se ide na submit
        e.preventDefault(e);
}

//funkcija koja cuva uneti zadatak u Local Storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){ //ako nema nista u storidzu
     tasks=[]; //pravi se prazan niz, u koji se smestaju zadaci
    }
    else { //ako local storage nije prazan
        tasks=JSON.parse(localStorage.getItem('tasks')); // promenjivoj tasks se dodeljuje json pretvoren u objekat
    }
    tasks.push(task); //nizu tasks u koji se smestaju zadaci se dodaje vrednost iz inputa (zadatak) koja je funkciji prosledjena kao argument,
    //sada postoji niz sa zadacima, to su zadaci pokupljeni iz storidza + zadatak koji smo uneli
    //nakon toga, potrebno je upisati zadatak u storidz
    localStorage.setItem('tasks', JSON.stringify(tasks));// pristupa se localstoridzu, prosledjuje se naziv niza i prosledjuje mu se niz tasks pretvoren u string

}

//Funkcija koja brise zadatak
function removeTask(e){
    //dodajemo if proveru, da bi se targetirao samo iskic za brisanje
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Da li ste sigurni")){ //predifinisana funkcija koja izbacuje alert koji ima logicku da i ne
      e.target.parentElement.parentElement.remove(); //brise iz HTML-a
      //brise iz storiza
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);// kada se klinke na x, targetira se roditelj roditelja, sto je li element

    }
}} 
 //funkcija koja brise iz lokal storidza
function removeTaskFromLocalStorage(taskItem){ //targetira li element kod kliknutog iksa za brisanje
    let tasks; //deklarise promenjivu tasks
    if(localStorage.getItem('tasks')===null){ //proverava da li postoji u storidzu
        tasks=[]; //ako ne postoji, pravi prazan niz 
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks')); //ako postoji, u zadatak se smesta sve iz local storidza
    }

    tasks.forEach((task, index)=>{ //prolazimo kroz niz pomocu foreach petlje, i trenutni element kroz koji prolazimo je task
      if(taskItem.textContent===task){ //ako tekstualni sadrzaj taska odgovara lupovanom tasku
        tasks.splice(index, 1); //uklanja se jedan clan niza pod njegovim indeksom
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));//izmenjen niz sa izbrisanim clanom se ponovo smesta u lokal storidz na mesto starog
}
//Funkcija koja brise sve zadatke
function clearTasks(){
    if(confirm("Ova radnja briše sve zadatke. Da li ste sigurni da želite da nastavite?")){
    // taskList.innerHTML=''; //
    //malo brzi nacin
    while(taskList.firstChild){ //petlja radi dok ima prvog deteta
      taskList.removeChild(taskList.firstChild); //uklanja prvo dete taskliste, to radi dokle god se ne izbrisu sva deca
    }
    clearTasksFromLocalStorage();
}}
//definisanje funkcije koja brise sve zadatke iz localstoridza
function clearTasksFromLocalStorage(){
    localStorage.clear(); //pristupa local storidzu i pokrece metodu koja sve brise iz njega
}

//filtrira zadatke prema pojmu koji smo ukucali
function filterTasks(e){ 
    const text=e.target.value.toLowerCase(); //sve prebacuje u mala slova radi uporedjivanja striga

 document.querySelectorAll('.collection-item').forEach( //prolazi kroz sve html elemente sa klasom .collection-item
     function(task){ //parametar je task, odnosno svaki lupovani element html-a u kome se nalazi upisani zadatak
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