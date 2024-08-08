<template>
  <div class="q-pa-md">
    <form class="form" @submit.prevent="addTodoHandler">
      <q-input
        ref="titleInput"
        v-model="title"
        color="secondary"
        label-color="secondary"
        label="Enter title"
        outlined
        bg-color="primary"
        dark
        autofocus
        clearable
        class="input"
        :rules="[(value) => validateValue(value, submitted)]"
      ></q-input>

      <q-input
        ref="textInput"
        v-model="text"
        color="secondary"
        label-color="secondary"
        label="Enter text"
        outlined
        clearable
        class="input"
        dark
        :rules="[(value) => validateValue(value, submitted)]"
      ></q-input>

      <q-input
        ref="dateInput"
        v-model="date"
        bg-color="primary"
        color="secondary"
        label-color="secondary"
        dark
        outlined
        class="input"
        @keyup.enter="handleKeyUp"
        :rules="[(value) => validateDate(value, submitted)]"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer" color="secondary">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
              @hide="focusDateInput"
            >
              <q-date v-model="date" class="calendar">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </form>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue';
import getDate from '../utils/getDate';
import { addTodo } from '../store/store';
import { validateValue, validateDate } from '../utils/validators';

export default {
  name: 'FormPage',
  setup() {
    const title = ref('');
    const text = ref('');
    const date = ref(getDate());
    const titleInput = ref(null);
    const textInput = ref(null);
    const dateInput = ref(null);
    const submitted = ref(false);

    const addTodoHandler = async () => {
      submitted.value = true;

      try {
        const isValidTitle = await titleInput.value.validate();
        const isValidText = await textInput.value.validate();
        const isValidDate = await dateInput.value.validate();

        if (isValidTitle && isValidText && isValidDate) {
          await addTodo(title.value, text.value, date.value);

          title.value = '';
          text.value = '';
          date.value = getDate();
          submitted.value = false;
          titleInput.value.focus();
        }
      } catch (error) {
        console.error(error);
        submitted.value = false;
      }
    };

    const handleKeyUp = () => {
      addTodoHandler();
    };

    const focusDateInput = () => {
      if (dateInput.value) {
        dateInput.value.focus();
      }
    };

    return {
      title,
      text,
      date,
      titleInput,
      textInput,
      dateInput,
      submitted,
      handleKeyUp,
      addTodoHandler,
      validateValue,
      validateDate,
      focusDateInput,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  column-gap: 20px;
  width: 100%;

  @media (max-width: 767.98px) {
    display: grid;
  }
}

.input {
  width: 100%;
  @media (min-width: 767.98px) {
    max-width: 400px;
  }
}

.calendar {
  color: $black;
}
</style>
