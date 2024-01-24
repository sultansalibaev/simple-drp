import { reactive, ref, computed } from "vue";

const current_month = reactive(ref(new Date('2024-01')))

const currentMonth = computed(() => current_month.value.getMonth())
const currentYear = computed(() => current_month.value.getFullYear())
const firstWeekDay = computed(() => (
    currentMonth.value === 0
        ? new Date(currentYear.value - 1, 11, 31).getDay()
        : new Date(currentYear.value, currentMonth.value, 7).getDay()
));
const prevMonthLastDate = computed(() => (
    new Date(currentYear.value, currentMonth.value, 0)
        .minus('date', firstWeekDay.value)
        .getDate()
));
const calendar_weeks = computed(() => {
    let weeks = [[]];

    if (firstWeekDay.value > 0) {
        fillWeekDays(firstWeekDay.value + 1, weeks, (date) => (
            new Date(new Date(currentYear.value, currentMonth.value).minus('date', 1).setDate(prevMonthLastDate.value + date))
        ));
    }

    fillWeekDays(lastDateOfMonth.value + 1, weeks, (date) => new Date(currentYear.value, currentMonth.value, date));

    if ((7 - weeks.at(-1).length) > 0) {
        fillWeekDays((7 - weeks.at(-1).length) + 1, weeks, (date) => new Date(new Date(currentYear.value, currentMonth.value).plus('month', 1).setDate(date)));
    }

    return weeks;
})

function fillWeekDays(days, weeks, cb = (val) => (val)) {

    for (let date = 1; date < days; date++) {
        if (weeks.at(-1).length == 7) {
            weeks.push([])
        }
        weeks.at(-1).push(cb(date))
    }
}
const lastDateOfMonth = computed(() =>
	new Date(currentYear.value, currentMonth.value + 1, 0).getDate(),
)



export {
    current_month,
    calendar_weeks,
    lastDateOfMonth,
}