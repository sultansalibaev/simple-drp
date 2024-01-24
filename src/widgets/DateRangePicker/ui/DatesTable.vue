<template>
	<div class="table-container">
		<slot></slot>
		<table>
			<thead>
				<tr>
					<th v-for="w in ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']" :key="w">{{ w }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(week, i) in calendar_weeks" :key="i">
					<template v-for="date in  week" :key="date">
						<td>{{ date.getDate() }}</td>
					</template>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>

import { calendar_weeks } from '../model/slice/table'

</script>