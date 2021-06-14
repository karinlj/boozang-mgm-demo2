<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col s12 l12">
          <div v-if="error">{{ error }}</div>
          <div v-if="tests.length"><ListTests :tests="tests"></ListTests></div>
          <div v-else>Loading...</div>
        </div>

        <div class="col s12 l6">
          <div v-if="error">{{ error }}</div>
          <div v-if="projects.length">
            <ListProjects :projects="projects"></ListProjects>
          </div>
          <div v-else>Loading...</div>
        </div>

        <div class="col s12 l6">
          <div v-if="error">{{ error }}</div>
          <div v-if="testers.length">
            <ListTesters :testers="testers"></ListTesters>
          </div>
          <div v-else>Loading...</div>
        </div>
        <!-- <div class="col s12 m6 l3">
          <License></License>
        </div>
        <div class="col s12 m6 l3">
          <BugReports></BugReports>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Test from "../types/Test";
import Project from "../types/Project";
import Tester from "../types/Tester";
import ListProjects from "../components/projects/ListProjects.vue";
import ListTesters from "../components/testers/ListTesters.vue";
import ListTests from "../components/tests/ListTests.vue";
import { getData } from "../composables/fetchFunctions";

export default defineComponent({
  name: "Home",
  components: {
    ListProjects,
    ListTesters,
    ListTests,
  },
  setup() {
    const error = ref<any>(null);
    const tests = ref<Test[]>([]);
    const projects = ref<Project[]>([]);
    const testers = ref<Tester[]>([]);

    const testsUrl = "http://localhost:9000/tests";

    const loadtests = async () => {
      const testsFromServer = await getData(testsUrl);
      tests.value = testsFromServer;

      if (testsFromServer) {
        error.value = null;
      } else {
        error.value = "Sorry, no data available";
        console.log(error.value);
      }

      // try {
      //   let data = await fetch("http://localhost:9000/tests");
      //   // console.log("data: ", data);
      //   if (!data.ok) {
      //     throw Error("Sorry, no data available");
      //   }
      //   //.value to update the ref
      //   tests.value = await data.json();
      // } catch (err) {
      //   error.value = err.message;
      //   // console.log(" error.value: ", error.value);
      // }
    };
    loadtests();

    const loadprojects = async () => {
      try {
        let data = await fetch("http://localhost:9000/projects");
        // console.log("data: ", data);
        if (!data.ok) {
          throw Error("Sorry, no data available");
        }
        projects.value = await data.json();
      } catch (err) {
        error.value = err.message;
        // console.log(" error.value: ", error.value);
      }
    };
    loadprojects();

    const loadtesters = async () => {
      try {
        let data = await fetch("http://localhost:9000/testers");
        //console.log("data: ", data);
        if (!data.ok) {
          throw Error("Sorry, no data available");
        }
        testers.value = await data.json();
      } catch (err) {
        error.value = err.message;
      }
    };
    loadtesters();
    return { tests, projects, testers, error };
  },
});
</script>
<style lang="scss">
.home {
  margin-top: 2rem;
  .container {
    max-width: 1300px;
    @media all and (min-width: 993px) {
      width: 90%;
    }
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .edit_header {
    .delete {
      cursor: pointer;
    }
  }
}
</style>
