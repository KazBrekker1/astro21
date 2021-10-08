<template>
	<form class="card bg-primary text-white" @submit.prevent="submitVisitor" style="width: 20rem">
		<div class="card-body">
			<input
				placeholder="Visitor Name"
				v-model="name"
				type="text"
				class="bg-transparent text-center text-white border-0 w-100 h5"
				required
			/>
		</div>
		<ul class="list-group m-2">
			<li class="list-group-item list-group-item-dark p-1 m-1">
				<input
					placeholder="Visitor Email"
					v-model="email"
					type="email"
					class="bg-transparent text-center border-0 w-100 h5"
					required
				/>
			</li>
			<li class="list-group-item list-group-item-dark p-1 m-1">
				<input
					v-model="number"
					placeholder="Visitor Phone"
					type="tel"
					class="bg-transparent text-center border-0 w-100 h5"
					required
				/>
			</li>
			<li class="list-group-item list-group-item-dark p-1 pb-0 m-1">
				<select class="bg-transparent border-0 w-100 h5" v-model="p1D1">
					<option value disabled>Select p1D1</option>
					<option
						value="Eng. Naief Osman - Secrets and Mysteries of the Universe from the Atom to The Galaxy (Part I )|| أسرار الكون من الذرة إلى المجرة (الجزء الأول)- مهندس: نايف عثمان"
					>Eng. Naief Osman - Secrets and Mysteries of the Universe from the Atom to The Galaxy (Part I )|| أسرار الكون من الذرة إلى المجرة (الجزء الأول)- مهندس: نايف عثمان</option>
					<option
						value="Dr. Youssef Moulane - Searching For Life Beyond Earth || د. يوسف مولان - البحث عن الحياة خارج الأرض"
					>Dr. Youssef Moulane - Searching For Life Beyond Earth || د. يوسف مولان - البحث عن الحياة خارج الأرض</option>
					<option
						value="Prof. Saleem Zaroubi - Cosmology and The Limits of Knowledge || البروفيسور سليم الزروبي - علوم الكون وحدود المعرفة"
					>Prof. Saleem Zaroubi - Cosmology and The Limits of Knowledge || البروفيسور سليم الزروبي - علوم الكون وحدود المعرفة</option>
				</select>
			</li>
			<li class="list-group-item list-group-item-dark p-1 pb-0 m-1">
				<select class="bg-transparent border-0 w-100 h5" v-model="p2D1">
					<option value disabled>Select p2D1</option>
					<option
						value="Eng. Yasser Abu-Elhassab - Star's Fiction....Space in Science Fiction || م. ياسر أبو الحسب - خيال النجوم .... الفضاء في الخيال العلمي"
					>Eng. Yasser Abu-Elhassab - Star's Fiction....Space in Science Fiction || م. ياسر أبو الحسب - خيال النجوم .... الفضاء في الخيال العلمي</option>
					<option
						value="Eng. Abdullah Al-Ghamdi The Future of Aerospace Engineering"
					>Eng. Abdullah Al-Ghamdi The Future of Aerospace Engineering</option>
					<option
						value="Eng. Akram Amin Abdellatif - The Utilization of The New Space Race in Understanding Our Planet || م. أكرم أمين عبد اللطيف - الاستفادة من سباق الفضاء الجديد في فهم كوكبنا"
					>Eng. Akram Amin Abdellatif - The Utilization of The New Space Race in Understanding Our Planet || م. أكرم أمين عبد اللطيف - الاستفادة من سباق الفضاء الجديد في فهم كوكبنا</option>
				</select>
			</li>
			<li class="list-group-item list-group-item-dark p-1 pb-0 m-1">
				<select class="bg-transparent border-0 w-100 h5" v-model="p1D2">
					<option value disabled>Select p1D2</option>
					<option
						value="Dr. Youssef Moulane - Small Bodies: Source of Danger or Origin of Life? || د. يوسف مولان - الأجسام الصغيرة .. مصدر خطر أم أصل الحياة؟"
					>Dr. Youssef Moulane - Small Bodies: Source of Danger or Origin of Life? || د. يوسف مولان - الأجسام الصغيرة .. مصدر خطر أم أصل الحياة؟"</option>
					<option
						value="Eng. Naief Osman - Secrets and Mysteries of the Universe from the Atom to The Galaxy (Part II) || م. نايف عثمان - أسرار الكون من الذرة إلى المجرة (الجزء الثاني)"
					>Eng. Naief Osman - Secrets and Mysteries of the Universe from the Atom to The Galaxy (Part II) || م. نايف عثمان - أسرار الكون من الذرة إلى المجرة (الجزء الثاني)"</option>
					<option
						value="Ms. Mayssa El Yazidi - BepiColombo Space Mission and Mercury Exploration || السيدة ميساء اليزيدي - BepiColombo المهمة الفضائية و استكشاف عطارد"
					>Ms. Mayssa El Yazidi - BepiColombo Space Mission and Mercury Exploration || السيدة ميساء اليزيدي - BepiColombo المهمة الفضائية و استكشاف عطارد"</option>
				</select>
			</li>
			<li class="list-group-item list-group-item-dark p-1 pb-0 m-1">
				<select class="bg-transparent border-0 w-100 h5" v-model="p2D2">
					<option value disabled>Select p1D2</option>
					<option
						value="Dr. Muhammad Al-Asiri - What are space technologies' pros and cons? || تقنيات الفضاء ما لها وما عليها - د. محمد العصيري"
					>Dr. Muhammad Al-Asiri - What are space technologies' pros and cons? || تقنيات الفضاء ما لها وما عليها - د. محمد العصيري"</option>
					<option
						value="Eng. Akram Amin Abdellatif - The Upcoming Challenges For Aerospace Engineering || م. أكرم أمين عبد اللطيف - التحديات القادمة لهندسة الطيران والفضاء"
					>Eng. Akram Amin Abdellatif - The Upcoming Challenges For Aerospace Engineering || م. أكرم أمين عبد اللطيف - التحديات القادمة لهندسة الطيران والفضاء"</option>
					<option
						value="Ms.Shelli Brunswick - First Steps Toward Access and Opportunity in the Global Space Ecosystem || السيدة شيلي برونزويك - الخطوات الأولى نحو الوصول والفرص في نظام الفضاء العالمي"
					>Ms.Shelli Brunswick - First Steps Toward Access and Opportunity in the Global Space Ecosystem || السيدة شيلي برونزويك - الخطوات الأولى نحو الوصول والفرص في نظام الفضاء العالمي"</option>
				</select>
			</li>
		</ul>
		<div class="card-footer p-2 shadow-sm">
			<button type="submit" class="btn btn-success">Submit</button>
			<button type="button" class="btn btn-danger" @click="cancelForm">Cancel</button>
		</div>
	</form>
</template>

<script>
import { reactive, toRefs } from "vue"
import { useStore } from "vuex"
export default {
	name: "VisitorForm",
	setup(props, { emit }) {
		const store = useStore()
		const visitorState = reactive({
			name: "",
			email: "",
			number: "",
			arrived: false,
			p1D1: "",
			p2D1: "",
			p1D2: "",
			p2D2: "",
		})
		const submitVisitor = () => {
			store.dispatch("addVisitor", {
				name: visitorState.name,
				email: visitorState.email,
				number: visitorState.number,
				arrived: visitorState.arrived,
				p1D1: visitorState.p1D1 || "Didnt register For a Workshop",
				p2D1: visitorState.p2D1 || "Didnt register For a Workshop",
				p1D2: visitorState.p1D2 || "Didnt register For a Workshop",
				p2D2: visitorState.p2D2 || "Didnt register For a Workshop",
			})
			cancelForm()
		}
		const cancelForm = () => {
			emit("exitForm")
		}
		return { submitVisitor, ...toRefs(visitorState), cancelForm }
	},
}
</script>
