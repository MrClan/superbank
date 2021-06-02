<template>
  <div class="flex flex-wrap">
    <div class="w-full px-4">
      <section class="relative mb-4">
        <section class="py-0 bg-blueGray-600">
          <div class="container mx-auto px-4">
            <div class="flex flex-wrap">
              <div class="lg:pt-12 pt-6 w-full md:w-12/12 px-4 text-center">
                <h2 class="text-4xl font-semibold text-blueGray-100 mb-8">
                  Deposit
                </h2>
              </div>
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
              >
                <div class="rounded-t bg-white mb-0 px-6 py-6">
                  <div class="text-center flex justify-between">
                    <h6 class="text-blueGray-700 text-xl font-bold">
                      Balance: $153300
                    </h6>
                  </div>
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <h6
                      class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"
                    >
                      Enter Required Information
                    </h6>
                    <div class="flex flex-wrap">
                      <div class="w-full lg:w-6/12 px-4">
                        <div class="relative w-full mb-3">
                          <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Amount To Deposit
                          </label>
                          <input
                            type="number"
                            class="border-0 px-3 py-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 text-semibold"
                            style="font-size: xx-large"
                            value="lucky.jesse"
                          />
                        </div>
                      </div>
                      <div class="w-full px-4">
                        <div class="relative w-full mb-3">
                          <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Source
                          </label>

                          <textarea
                            type="text"
                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            rows="3"
                          >
                            from salary
                        </textarea
                          >
                        </div>
                      </div>
                    </div>

                    <hr class="mt-6 border-b-1 border-blueGray-300" />

                    <button
                      class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-md mx-4 my-4 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Deposit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>
