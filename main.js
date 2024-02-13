// 유저가 할일을 입력한다.
// + 버튼을 누르면 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일에 밑줄이 생긴다.
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// All, not Done, Done 탭을 누르면 언더바가 이동한다.
// not Done 탭에는 진행중인 아이템만, Done 탭에는 끝난 아이템만 보여준다.
// All 탭을 누르면 다시 전체 아이템을 보여준다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click", addTask)

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList)
    render()
}

function render() {
    let resultHTML = '';

    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].isComplete == true) {
            resultHTML +=`
            <div class="task">
                <div class="task-done">${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                </div>
            </div>`;
        }else {
            resultHTML += `
            <div class="task">
                <div>${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                </div>
            </div>`;
        }  
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete; // isComplete의 원래의 값의 반대로 입력함
            break;
        }
    }
    render() // 값이 업데이트 되면 ui도 업데이트 돼야 하기때문에 해줘야함(자동으로 ui도 업데이트 해주는건 리액트)
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){ 
        if(taskList[i].id == id){
            taskList.splice(i, 1)
            break;
        }
    }
    render()
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}