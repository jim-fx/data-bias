<script>
  export let person;
  export let accepted;
</script>

<style>
  .accepted {
    background-color: rgb(131, 243, 131);
    font-style: italic;
  }

  td {
    padding: 5px;
  }
</style>


<tr class:accepted>
  <td>{person.Vorname} {person.Nachnamekuerzel}</td>

  {#if "score" in person}
    <td>{Math.floor(person.score*10)/10}</td>
  {/if}

  {#if "age" in person}
    <td>{person.age}</td>
  {/if}
</tr>