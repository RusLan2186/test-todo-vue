<template>
  <div>
    <div v-for="(todos, date) in sortedGroupedTodos" :key="date">
      <div
        @click="toggleDate(date)"
        :class="{ header: true, header__close: isDateOpen(date) }"
      >
        <div class="header__info">
          <p class="marker"></p>
          <img v-if="isDateOpen(date)" :src="checkIcon" alt="icon" />

          <h2 class="header__title">{{ formatDate(date) }} Tasks</h2>
        </div>
        <div v-if="!isDateOpen(date)">
          <img :src="icon" alt="icon" />
        </div>
      </div>

      <ul class="list" v-if="isDateOpen(date)">
        <li v-for="todo in todos" :key="todo.id" class="todo">
          <div class="info">
            <p
              class="marker"
              :style="{ backgroundColor: getMarkerColor(todo.id) }"
            ></p>
            <div>
              <h2
                :class="{ title: !todo.completed, completed: todo.completed }"
              >
                {{ todo.title }}
              </h2>
              <span class="text">{{ todo.text }}</span>
            </div>
          </div>
          <div>
            <q-toggle
              v-model="todo.completed"
              checked-icon="check"
              color="positive"
              icon-color="#A9A9A9"
              unchecked-icon="clear"
              size="50px"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import store from '../store/store';
import icon from '../assets/icons/Vector.svg';
import checkIcon from '../assets/icons/check.svg';
import getMarkerColor from 'src/utils/getMarkerColor';
import formatDate from 'src/utils/formatDate';

export default {
  name: 'TodoListPage',
  setup() {
    const openDates = ref([]);

    const sortedGroupedTodos = computed(() => {
      const grouped = store.todos.reduce((groups, todo) => {
        const date = todo.date;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(todo);
        return groups;
      }, {});

      const sortedDates = Object.keys(grouped).sort(
        (a, b) => new Date(a) - new Date(b),
      );

      const sortedGroups = {};
      sortedDates.forEach((date) => {
        sortedGroups[date] = grouped[date].sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
      });

      return sortedGroups;
    });

    const toggleDate = (date) => {
      const index = openDates.value.indexOf(date);
      if (index === -1) {
        openDates.value.push(date);
      } else {
        openDates.value.splice(index, 1);
      }
    };

    const isDateOpen = (date) => {
      return openDates.value.includes(date);
    };

    return {
      sortedGroupedTodos,
      formatDate,
      toggleDate,
      isDateOpen,
      getMarkerColor,
      icon,
      checkIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 14px;
  font-size: 24px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 25px;
  padding: 14px 33px;
  box-shadow: -8px -8px 20px 0 #5c5c5c36;
  transition: 0.3s all ease 0s;

  &:hover {
    transform: scale(1.02);
  }
}

.header__close {
  box-shadow: none;
  justify-content: flex-start;

  p {
    display: none;
  }
}

.header__info {
  display: flex;
  column-gap: 14px;

  img{
    margin-top: 6px;
  }
}

.header__title {
  line-height: 1.2;
  margin-top: 7px;
}

.list {
  width: 100%;
  border-radius: 40px;
  box-shadow: -8px -8px 20px 0 #5c5c5c36;
  padding: 17px;
  margin-top: 20px;
}

.todo {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.info {
  display: flex;
  align-items: flex-start;
  column-gap: 14px;
}

.marker {
  width: 5px;
  height: 40px;
  background-color: $grey;
}

.title,
.completed {
  font-size: 24px;
  line-height: 1.2;
}

.completed {
  text-decoration: line-through;
}

.text {
  font-size: 14px;
  color: #ffffff;
  opacity: 0.6;
}
</style>
