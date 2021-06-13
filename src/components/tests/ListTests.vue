<template>
  <div class="card">
    <div class="card-content">
      <Header headingColor="bluetext" heading="Test executions"></Header>
      <table id="dashboard_table" class="table striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status/hasPassed</th>
            <th>Duration</th>
            <th>Latest execution</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="test in tests" :key="test.id">
            <td>{{ test.name }}</td>
            <td>
              <i
                class="material-icons"
                :class="test.hasPassed ? 'green-text' : 'red-text'"
                >fiber_manual_record</i
              >
            </td>
            <td class="timestamp">{{ secondsToMinutes(test.duration) }}</td>
            <!-- <td class="timestamp">
              {{ formatDate(test.latestExecution) }}
            </td> -->
            <td class="timestamp">June5</td>
            <!-- <td>
              <p class="btn btn-floating purple">
                {{ getProject(test.projectId) }}
              </p>
            </td> -->
          </tr>
        </tbody>
      </table>

      <!-- <div>
        hello tests
        <div v-for="test in tests" :key="test.id">
          <p>{{ test.name }}</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Test from "../../types/Test";
import Header from "../shared/Header.vue";

export default defineComponent({
  components: {
    Header,
  },
  props: {
    tests: {
      required: true,
      //generic to pass in the type
      type: Array as PropType<Test[]>,
    },
  },
  setup() {
    const secondsToMinutes = (time: any) => {
      let testTime =
        Math.floor(time / 60) + "min " + Math.floor(time % 60) + "s ";
      //console.log("testTime", testTime);
      return testTime;
    };
    const formatDate = (someDate: any) => {
      //console.log("someDate", someDate);
      let date = new Date(someDate * 1000);
      let format = date.toISOString().slice(0, 10);
      return format;
    };
    return { secondsToMinutes, formatDate };
  },
});
</script>

<style lang="scss">
.bluetext {
  color: #0085cc;
}
</style>
