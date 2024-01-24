<template>
	<div class="table-container">
		<slot></slot>
		<div class="flex flex-col">
			<div class="flex justify-around">
				<div
					v-for="week_day in ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']"
					:key="week_day"
					class="font-bold"
				>{{ week_day }}</div>
			</div>
		</div>
		<div class="calendar-dates">
			<div
				v-for="(date, i) in calendar_dates"
				:key="i"
				class="date"
				:class="{
					'cursor-pointer hover:bg-[#eee]': isCurrentMonth(date),
					'outside-date': !isCurrentMonth(date),
					'start-date': period.start == date.format('Y-m-d'),
					'finish-date': period.finish == date.format('Y-m-d'),
				}"
				@click="selectDate(date)"
			>
				{{ date.getDate() }}
			</div>
		</div>
	</div>
</template>

<script setup>

import { reactive, ref } from 'vue';
import { calendar_dates, currentMonth, currentYear } from '../model/slice/dates'

function isCurrentMonth(date) {
	return currentYear.value === date.getFullYear() && currentMonth.value === date.getMonth()
}

const period = reactive(ref({
	start: null,
	finish: null,
}))

function selectDate(date) {
	if (period.value.start == null) {
		period.value.start = date.format('Y-m-d');
	}
	else if (period.value.finish != null) {
		period.value.start = date.format('Y-m-d');
		period.value.finish = null;
	}
	else {
		period.value.finish = date.format('Y-m-d');

		if (date.valueOf() < new Date(period.value.start).valueOf()) {
			period.value = {
				finish: period.value.start,
				start: date.format('Y-m-d'),
			};
		}
	}

}

</script>

<style lang="scss">

.calendar-dates {
	@apply grid grid-cols-7;
}

.date {
	@apply flex justify-center items-center w-8 h-8 rounded-md transition-all duration-75;
}

.outside-date {
	@apply text-[#bbb] pointer-events-none;
}

.start-date,
.finish-date {
	color: white;
	background: #357ebd !important;
}
.start-date {
    border-radius: 6px 0 0 6px !important;
}
.calendar-dates:has(.start-date):not(:has(.finish-date)) .start-date {
    border-radius: 6px !important;
}
.finish-date {
    border-radius: 0 6px 6px 0 !important;
}



.calendar-dates:has(.start-date):has(.finish-date) .start-date ~ .date:not(.finish-date ~ .date),
.calendar-dates:has(.start-date):not(:has(.finish-date)) .date:hover ~ .date:not(.start-date ~ .date):not(.outside-date),
.calendar-dates:has(.start-date):not(:has(.finish-date)) .start-date ~ .date:not(.date:hover ~ .date):not(.outside-date) {
	background: #ebf4f8;
	border-radius: 0;
}
.calendar-dates:has(.start-date):not(:has(.finish-date)) .date:not(.start-date):hover {
	color: white;
	background: #357ebd !important;
    border-radius: 6px !important;
}

.start-date.finish-date {
	border-radius: 50% !important;
}

</style>