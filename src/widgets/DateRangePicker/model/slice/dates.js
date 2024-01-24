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
const calendar_dates = computed(() => {
    let calendar_dates = [];

    if (firstWeekDay.value > 0) {
        fillWeekDays(firstWeekDay.value + 1, calendar_dates, (date) => (
            new Date(
                new Date(currentYear.value, currentMonth.value)
                    .minus('date', 1)
                    .setDate(prevMonthLastDate.value + date)
            )
        ));
    }

    fillWeekDays(
        lastDateOfMonth.value + 1,
        calendar_dates,
        (date) => new Date(currentYear.value, currentMonth.value, date)
    );

    const lastDatesCount = 7 - (calendar_dates.length % 7);
    if (lastDatesCount > 0) {
        fillWeekDays(
            lastDatesCount + 1,
            calendar_dates,
            (date) => (
                new Date(
                    new Date(currentYear.value, currentMonth.value)
                        .plus('month', 1)
                        .setDate(date)
                )
            )
        );
    }

    return calendar_dates;
})

function fillWeekDays(
    days,
    calendar_dates,
    cb = (val) => (val)
) {
    for (let date = 1; date < days; date++) {
        calendar_dates.push(cb(date))
    }
}
const lastDateOfMonth = computed(() =>
	new Date(currentYear.value, currentMonth.value + 1, 0).getDate(),
)



export {
    current_month,
    calendar_dates,
    lastDateOfMonth,
    currentMonth,
    currentYear,
}