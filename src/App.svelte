<script>
  import toastr from "toastr";
  toastr.options = {
    timeOut: "1000",
    progressBar: true,
    positionClass: "toast-bottom-right",
  };

  import { db } from "./firebase";

  let task = {
    name: "",
    description: "",
  };

  let tasks = [];
  let editStatus = false;
  let currentId = "";

  db.collection("tasks").onSnapshot((querySnap) => {
    let docs = [];
    querySnap.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });

    tasks = [...docs];
  });

  const addTask = async () => {
    await db
      .collection("tasks")
      .doc()
      .set({
        ...task,
        createdAt: Date.now(),
      });

    toastr.success("new task created");
  };

  const handleSubmit = () => {
    if (!editStatus) {
      addTask();
    } else {
      updateTask();
    }

    task = { name: "", description: "" };
  };

  const updateTask = async () => {
    await db.collection("tasks").doc(currentId).update(task);
    toastr["success"]("Task updated");
  };

  const deleteTask = async (id) => {
    await db.collection("tasks").doc(id).delete();
    toastr["warning"]("Task deleted");
  };

  const editTask = (currentTask) => {
    editStatus = true;
    task.name = currentTask.name;
    task.description = currentTask.description;
    currentId = currentTask.id;
  };

  const onCancel = () => {
    editStatus = false;
    task = { name: "", description: "" };
  };
</script>

<style>
</style>

<form on:submit|preventDefault={handleSubmit} class="card card-body">
  <div class="form-group">
    <input
      bind:value={task.name}
      type="text"
      placeholder="write a new task"
      class="form-control" />
  </div>
  <div class="form-group">
    <textarea
      class="form-control"
      bind:value={task.description}
      rows="3"
      placeholder="write a task description" />
  </div>

  <button class="btn btn-primary">{#if !editStatus}
      Save
    {:else}Update{/if}</button>
  {#if editStatus}
    <button class="btn btn-info" on:click={onCancel}>Cancel</button>
  {/if}
</form>

{#each tasks as task}
  <div class="card card-body mt-2">
    <div class="d-flex justify-content-between">
      <h5>{task.name}</h5>
      <i
        class="material-icons"
        style="vertical-align:middle;"
        on:click={editTask(task)}>edit</i>
    </div>
    <p>{task.description}</p>
    <button class="btn btn-danger" on:click={deleteTask(task.id)}>
      <i
        class="material-icons"
        style="vertical-align:middle;">delete_forever</i>
    </button>
  </div>
{/each}
