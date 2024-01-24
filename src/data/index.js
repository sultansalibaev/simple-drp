import { reactive, ref } from "vue";
import "./utils"

export const dateRange = reactive(ref({
    startDate: '2023-05-06',
    endDate: '2024-09-09',
}))
export const selected_date_mode = reactive(ref('monthly'));

export const temp_end_date = reactive(ref(null))

export const current_selected = reactive(ref({
	date: dateRange.value.endDate,
	type: 'end',
}))

export const modal = reactive(ref(true))
export const between_dates = reactive(ref({
	[dateRange.value.startDate]: 'start',
	[dateRange.value.endDate]: 'end',
}))

export function select_range_period(period) {
	between_dates.value = {
		[period[0]]: 'start',
		[period[1]]: 'end',
	}
	current_selected.value.type = 'end'
	s_time.value = '00:00'
	f_time.value = '23:59'
	// current_selected.value.date = {}

}

export function setDateRange() {
    modal.value = true;
    let date_keys = Object.keys(between_dates.value);
	console.log('date_keys', date_keys, between_dates.value);
    if (date_keys.length == 1) {

		between_dates.value = {
			[date_keys[0]]: 'start',
			[date_keys[0]]: 'end',
		}
		temp_end_date.value = null
		current_selected.value.type = 'end'

		selected_date_mode.value = 'hourly'

		dateRange.value.startDate = date_keys[0]
        dateRange.value.endDate = date_keys[0]
    }
    else if (date_keys.length == 2) {
		let days_period = ((new Date(date_keys[1]).valueOf() - new Date(date_keys[0]).valueOf()) / 1000 / 3600 / 24) + 1;
		let temp_date_mode_condition = {
			hourly:  days_period <= 7,
			daily:   true,
			weekly:  days_period >= 7,
			monthly: days_period >= 3,
		};
		if (!temp_date_mode_condition[selected_date_mode.value]) {
			selected_date_mode.value = 'daily'
		}
        dateRange.value.startDate = date_keys[0]
        dateRange.value.endDate = date_keys[1]
    }

}

export const s_time = reactive(ref('00:00'))
export const f_time = reactive(ref('23:59'))
export const min = reactive(ref('2023-05-06'))
export const max = reactive(ref('2024-09-09'))

export const picker_range = reactive(ref(new Date('2024-09-09').format("Y-m")))
export const month = reactive(ref(new Date('2024-09-09').format("m")))
export const year = reactive(ref(new Date('2024-09-09').getFullYear()))


let today = new Date()
today.setHours(0, 0, 0, 0)
let priorDate = new Date(new Date().setDate(today.getDate() - 30));

let yesterday = new Date()
yesterday.setDate(today.getDate() - 1)
yesterday.setHours(0, 0, 0, 0);
let minProjectDate = new Date(min.value),
	maxProjectDate = new Date(max.value);

// let curr = new Date;
// let firstWeekDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
// let lastWeekDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
let firstWeekDay = new Date().minus('date', 6);
let lastWeekDay = new Date();


export const ranges = reactive(ref({
	'За весь период': [minProjectDate.format("Y-m-d"), maxProjectDate.format("Y-m-d")],
	'Сегодня': [today.format("Y-m-d"), today.format("Y-m-d")],
	'Вчера': [yesterday.format("Y-m-d"), yesterday.format("Y-m-d")],
	// 'Неделя': [firstWeekDay.format("Y-m-d"), lastWeekDay.format("Y-m-d")],
	'Неделя': [firstWeekDay.format("Y-m-d"), lastWeekDay.format("Y-m-d")],
	'30 дней': [priorDate.format("Y-m-d"), today.format("Y-m-d")],
	'Текущий месяц': [new Date(today.getFullYear(), today.getMonth(), 1).format("Y-m-d"), new Date(today.getFullYear(), today.getMonth() + 1, 0).format("Y-m-d")],
	'Прошлый месяц': [new Date(today.getFullYear(), today.getMonth() - 1, 1).format("Y-m-d"), new Date(today.getFullYear(), today.getMonth(), 0).format("Y-m-d")],
	//'This year': [new Date(today.getFullYear(), 0, 1), new Date(today.getFullYear(), 11, 31)],
}))



