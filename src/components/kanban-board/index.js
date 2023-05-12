import React from "react";
import "./index.css"

export default function KanbanBoard(props) { 

	let [tasks, setTasks] = React.useState([
		{ name: '1', stage: 0 },
		{ name: '2', stage: 1 },
	])

	let [stagesNames, setStagesNames] = React.useState(['Backlog', 'To Do', 'Ongoing', 'Done']);


	let stagesTasks = [];
	for (let i = 0; i < stagesNames.length; ++i) {
		stagesTasks.push([]);
	}
	for (let task of tasks) {
		const stageId = task.stage;
		stagesTasks[stageId].push(task);
	}
	const [taskName, setTaskName] = React.useState('');
	function handleTaskChange(event) 
	{
		event.preventDefault();
	
			setTaskName(event.target.value);


	}
	function handleSubmit(event) 
	{
		event.preventDefault();
		// console.log(taskName);
		if( taskName !== '')
		{
			setTasks([...tasks,{name: taskName, stage:0}]);
		}
	}
	
	function arrowBack(task,stageIndex,taskIndex)
	{
		// console.log("Got: ",task);
		tasks.map((item,index) => {
			if(item.name === task.name)
			{
				let st = item["stage"];
				if(st != 0){
					let newList = [...tasks];
					// const stageindex= stagesTasks[st].indexOf({name: task.name, stage:st});
					newList.splice(index,1);
					let n = [...tasks];
					tasks.splice(tasks.indexOf(item),1);
					setTasks([...tasks,{name: task.name,stage: st-1 }]);


					// console.log("Current stageIndex: ",stageIndex);
					// console.log("Current taskIndex: ", taskIndex);
					stagesTasks[stageIndex].splice(taskIndex,1);
					// stagesTasks[st+1].push({name: task.name,stage: st+1 });
					// console.log("stageTask: ",stagesTasks);
				}
			}
		})
	}

	function arrowForward(task,stageIndex,taskIndex)
	{
		console.log("Got: ",task);
		tasks.map((item,index) => {
			if(item.name === task.name)
			{
				let st = item["stage"];
				if(st != 3){
					let newList = [...tasks];
					// const stageindex= stagesTasks[st].indexOf({name: task.name, stage:st});
					newList.splice(index,1);
					let n = [...tasks];
					tasks.splice(tasks.indexOf(item),1);
					setTasks([...tasks,{name: task.name,stage: st+1 }]);


					// console.log("Current stageIndex: ",stageIndex);
					// console.log("Current taskIndex: ", taskIndex);
					stagesTasks[stageIndex].splice(taskIndex,1);
					// stagesTasks[st+1].push({name: task.name,stage: st+1 });
					// console.log("stageTask: ",stagesTasks);
				}
			}
		})
	}

	function deleteTask(task,stageIndex,taskIndex)
	{
		let n = [...tasks];
		tasks.splice(tasks.indexOf(task),1);
		setTasks([...tasks]);
	}

	return (
		<div className="mt-20 layout-column justify-content-center align-items-center">
			<section className="mt-50 layout-row align-items-center justify-content-center">
				<form onSubmit={handleSubmit}>	
				<input id="create-task-input" type="text" className="large" placeholder="New task name" value = {taskName} onChange= {handleTaskChange} data-testid="create-task-input" />
				<button type="submit" className="ml-30" data-testid="create-task-button" disabled = {taskName ===''} >Create task</button>
				</form>

			</section>

			<div className="mt-50 layout-row">
				{stagesTasks.map((tasks, i) => {
					return (
						<div className="card outlined ml-20 mt-0" key={`${i}`}>
							<div className="card-text">
								<h4>{stagesNames[i]}</h4>
								<ul className="styled mt-50" data-testid={`stage-${i}`}>
									{tasks.map((task, index) => {
										return <li className="slide-up-fade-in" key={`${i}${index}`}>
											<div className="li-content layout-row justify-content-between align-items-center">
												<span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
												<div className="icons">
													<button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`} disabled = {i ===0} onClick={() => arrowBack(task,i,index)}>
														<i className="material-icons">arrow_back</i>
													</button>
													<button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`} disabled={i ===3 }  onClick={() => arrowForward(task,i,index)}>
														<i className="material-icons">arrow_forward</i>
													</button>
													<button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`} onClick={() => deleteTask(task, index)}>
														<i className="material-icons">delete</i>
													</button>
												</div>
											</div>
										</li>
									})}
								</ul>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}