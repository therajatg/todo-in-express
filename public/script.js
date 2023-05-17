let allTasks = document.querySelectorAll(".task");

const changeTaskStatus = (task) => {
  allTasks.forEach((item) => {
    if (item.innerText === task) {
      console.log(11111);
      if (!item.style.textDecoration) {
        item.style.textDecoration = "line-through";
      } else {
        item.style.textDecoration = "";
      }
    }
  });
};

const deleteTask = async (task) => {
  const response = await axios.delete(`/tasks`, { data: { task } });
  location.reload();
};
