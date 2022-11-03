class EmployeePayrollData {

    //getter and setter method
    get id() {return this._id; }
    set id(id) {
        this._id=id;
    }

    get name() {return this.name;}
    set name(name){
        let nameRegex= RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
        if(nameRegex.test(name))
            this._name = name;
        else throw 'Name is Incorrect!';    
    }

    get profilePic() {return this.profilePic;}
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get gender() { return this._gender;}
    set gender(gender){
        this._gender = gender;
    }

    get department() { return this._department;}
    set department(department){
        this._department = department;
    }

    get salary() { return this._salary;}
    set salary(salary){
        this._salary = salary;
    }
    
    get note() { return this._note;}
    set note(note){
        this._note = note;
    }

    get startDate() { return this._startDate;}
    set startDate(startDate){
        this._startDate = startDate;
    }

    //method
    toString() {
        const options ={year:'numeric', month:'long', day:'numeric'};
        const empDate = !this.startDate ? "undefined" :
                    this.startDate.toLocalDateString("en-US",options);
        return "id=" + this.id + ", name=" + this.name + ", gender='"+ this.gender + ", profilePic='"+this.profilePic+", department="+ this.department+",salary="+this.salary + ",startDate="+empDate +",note="+this.note;}
    }

  //Document Load Set Event Listeners
  window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function() {
        if(name.ariaValueMax.length==0){
            textError.textContent="";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.ariaValueMax;
            textError.textContent= "";
        } catch (e){
            textError.textContent= e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.ariaValueMax;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });
  });

  //Ability to create Employee Payroll Object On Save.

  const save = () => {
    try {
        let EmployeePayrollData = new EmployeePayrollData();
        //uc4
        createAndUpdateStorage(EmployeePayrollData);
    }catch (e) {
        return;
    }
}

function createAndUpdateStorage(EmployeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList != undefined){
        employeePayrollList.push(EmployeePayrollData);
    }
    else {
        employeePayrollList = [EmployeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () =>{
    let EmployeePayrollData = new EmployeePayrollData();
        try{
            EmployeePayrollData.name = getInputValueById('#name');
        } catch (e) {
            setTextValue('.text-error', e);
            throw e;
        }
        EmployeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
        EmployeePayrollData.gendor = getSelectedValues('[name=gender]').pop();
        EmployeePayrollData.department = getSelectedValues('[name=department]').pop();
        EmployeePayrollData.salary = getInputValuesById('#salary');
        EmployeePayrollData.note = getSelectedValuesBYId('#notes');
        let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
        EmployeePayrollData.date=Date.parse(date);
        alert(EmployeePayrollData.toString());
        return EmployeePayrollData;
    }
  

const getSelectedValues = (propertyValue) => {
        let allItems = document.querySelectorAll(properValue);
        let setItems = [];
        allItems.forEach(item => {
            if(item.checked) setItems.push(item.value);
        });
        return setItems;
    }

//Saving Employee Payroll to Local Storage
 const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','january');
    setValue('#year','2020')
 }

 const unsetSelectedValues = (propertyValue) => {
    let allItems= document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked=false;
    });

    const setTextValue = (id, value) => {
        const element = document.querySelector(id);
        element.textContent= value;
    }

    const setValue = (id, value) => {
        const element = document.querySelector(id);
        element.value=value;
    }
 }

   

