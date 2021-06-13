<template>
  <div class="card">
    <div class="card-content">
      <Header headingColor="darkbluetext" heading="Team Members"></Header>
      <!--     <Header
        headingColor="blue-text"
        heading="Team members"
        linkName="AddTester"
        btnName="Add Team member"
      ></Header> -->
      <table id="dashboard_table" class="table striped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Latest activity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tester in testers" :key="tester.id">
            <!-- single tester -->
            <td>
              <p class="btn btn-floating blue">
                {{ tester.firstname[0] + tester.lastname[0] }}
              </p>
            </td>
            <td>{{ tester.firstname }} {{ tester.lastname }}</td>
            <!-- dynamic class set in method -->
            <!-- <td class="timestamp">{{ formatDate(tester.latestActivity) }}</td> -->
            <td class="timestamp">June5</td>
            <td>
              <i
                class="material-icons"
                :class="calculateStatus(tester.latestActivity)"
                >fiber_manual_record</i
              >
            </td>
            <td>
              <!-- <router-link :to="singleLink">
                <i class="material-icons blue-text edit">edit</i>
              </router-link> -->
              <!-- <router-link
                :to="{
                  name: 'EditTester',
                  params: { tester_slug: tester.slug },
                }"
              >
                <i class="material-icons blue-text edit">edit</i>
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
import Tester from "../../types/Tester";

export default defineComponent({
  components: {
    Header,
  },
  props: {
    testers: {
      required: true,
      type: Array as PropType<Tester[]>,
    },
  },
  setup() {
    const formatDate = (someDate: any) => {
      //console.log("someDate", someDate);
      let date = new Date(someDate * 1000);
      let format = date.toISOString().slice(0, 10);
      return format;
    };
    const calculateStatus = (latestActivity: any) => {
      //today - latestActivity in seconds
      let diffTime = Math.floor(Date.now() / 1000) - latestActivity;
      //  console.log("####");
      //within one hour
      if (diffTime < 3600) {
        //console.log("diffHour");
        return "green-text";
        //within one week
      } else if (diffTime < 3600 * 24 * 7) {
        // console.log("diffWeek");
        return "yellow-text";
        //more than one week
      } else {
        // console.log("diffMoreThanWeek");
        return "grey-text";
      }
    };
    return { formatDate, calculateStatus };
  },
});
</script>

<style lang="scss">
.darkbluetext {
  color: #293b70;
}
</style>
