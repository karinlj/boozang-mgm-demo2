<template>
  <div class="card">
    <div class="card-content">
      <Header headingColor="pinktext" heading="Projects"></Header>
      <!-- <Header
        headingColor="purple-text"
        heading="Projects"
        linkName="AddProject"
        btnName="Add Project"
      ></Header> -->
      <table id="dashboard_table" class="table striped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Last updated</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>
              <p class="btn btn-floating purple">
                {{ project.name[0] }}{{ project.name[1] }}
              </p>
            </td>
            <td>{{ project.name }}</td>
            <!-- <td class="timestamp">
              {{ formatDate(project.lastUpdated) }}
            </td> -->
            <td class="timestamp">June5</td>

            <td>{{ project.numberOfTesters }}</td>
            <!-- <td class="">{{ numberOfTesters(project.id) }}</td> -->
            <td>
              <!-- <router-link
                :to="{
                  name: 'EditProject',
                  params: { project_slug: project.slug },
                }"
              >
                <i class="material-icons edit">edit</i>
              </router-link> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Header from "../shared/Header.vue";
import Project from "../../types/Project";

export default defineComponent({
  components: {
    Header,
  },
  props: {
    projects: {
      required: true,
      type: Array as PropType<Project[]>,
    },
  },
  setup() {
    const formatDate = (someDate: any) => {
      //console.log("someDate", someDate);
      let date = new Date(someDate * 1000);
      let format = date.toISOString().slice(0, 10);
      return format;
    };
    return { formatDate };
  },
});
</script>

<style lang="scss">
.pinktext {
  color: #f24d7f;
}
</style>
