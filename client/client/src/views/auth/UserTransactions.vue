<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <section class="relative mb-4">
        <section class="py-0 bg-blueGray-600">
          <div class="container mx-auto px-4">
            <div class="flex flex-wrap">
              <div class="lg:pt-12 pt-6 w-full md:w-12/12 px-4 text-center">
                <h2 class="text-4xl font-semibold text-blueGray-100 mb-8">
                  Transaction History
                </h2>
              </div>
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
                :class="[
                  color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white',
                ]"
              >
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                  <div class="flex flex-wrap items-center">
                    <div
                      class="relative w-full px-4 max-w-full flex-grow flex-1"
                    >
                      <h3
                        class="font-semibold text-lg"
                        :class="[
                          color === 'light'
                            ? 'text-blueGray-700'
                            : 'text-white',
                        ]"
                      >
                        Transaction Summary
                      </h3>
                    </div>
                  </div>
                </div>
                <div class="block w-full overflow-x-auto">
                  <!-- Projects table -->
                  <table
                    class="items-center w-full bg-transparent border-collapse"
                  >
                    <thead>
                      <tr>
                        <th
                          class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                          :class="[
                            color === 'light'
                              ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                              : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                          ]"
                        >
                          Activity
                        </th>
                        <th
                          class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                          :class="[
                            color === 'light'
                              ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                              : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                          ]"
                        >
                          Amount
                        </th>
                        <th
                          class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                          :class="[
                            color === 'light'
                              ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                              : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                          ]"
                        >
                          Source -> Target
                        </th>
                        <th
                          class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                          :class="[
                            color === 'light'
                              ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                              : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                          ]"
                        >
                          Post Transaction Balance
                        </th>
                        <th
                          class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                          :class="[
                            color === 'light'
                              ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                              : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                          ]"
                        >
                          Completed On
                        </th>
                        <th
                          class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                          :class="[
                            color === 'light'
                              ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                              : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                          ]"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="t in transactions" :key="t.id">
                        <th
                          class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                        >
                          <span
                            class="ml-3 font-bold"
                            :class="[
                              color === 'light'
                                ? 'text-blueGray-600'
                                : 'text-white',
                            ]"
                          >
                            <i
                              v-if="t.type == 'DEPOSIT'"
                              class="fas fa-circle text-emerald-500 mr-2"
                            ></i>

                            <i
                              v-if="t.type == 'CREDIT'"
                              class="fas fa-circle text-orange-500 mr-2"
                            ></i>

                            {{ t.type }}
                          </span>
                        </th>
                        <td
                          class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          {{ t.amount }}
                        </td>
                        <td
                          class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          {{ t.srcAccountNo }} -> {{ t.targetAccountNo }}
                        </td>
                        <td
                          class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          <i
                            v-if="t.type == 'deposit'"
                            class="fas fa-arrow-up text-emerald-500 mr-4"
                          ></i>

                          <i
                            v-if="t.type == 'withdraw'"
                            class="fas fa-arrow-down text-orange-500 mr-4"
                          ></i>

                          <i
                            v-if="t.type == 'transfer'"
                            class="fas fa-arrows-alt-h text-blueGray-500 mr-4"
                          ></i>

                          {{ t.postTransactionBalance }}
                        </td>
                        <td
                          class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                          {{ t.formattedCompletionDate }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
import apiHandler from "@/foundation/apiHandler";
export default {
  data() {
    return {
      transactions: [
        {
          srcAccountNo: "014-54125-4125-587",
          targetAccountNo: "014-45245-4512-357",
          type: "DEPOSIT",
          amount: "$480",
          completedOn: "24th May, 2021",
          postTransactionBalance: "$5700",
        },
      ],
    };
  },
  created() {
    apiHandler
      .get("/transactions")
      .then((res) => (this.transactions = res.data))
      .catch((err) => {
        apiHandler.log(err);
      });
  },
  components: {},
  props: {
    color: {
      default: "light",
      validator: function(value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.transactions.push(this.transactions[i % this.transactions.length]);
    }
  },
};
</script>
