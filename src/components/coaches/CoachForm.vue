<template>
	<form @submit.prevent="submitForm">
		<div class="form-control">
			<label for="firstname" :class="{ invalidText: !firstname.isValid }"
				>FirstName</label
			>
			<input
				type="text"
				id="firstname"
				v-model="firstname.value"
				:class="{ invalidBorder: !firstname.isValid }"
				@blur="clearValidity('firstname')"
			/>
			<p v-if="!firstname.isValid">FirstName must not be empty</p>
		</div>
		<div class="form-control">
			<label for="lastname" :class="{ invalidText: !lastname.isValid }"
				>LastName</label
			>
			<input
				type="text"
				id="lastname"
				v-model="lastname.value"
				:class="{ invalidBorder: !lastname.isValid }"
				@blur="clearValidity('lastname')"
			/>
			<p v-if="!lastname.isValid">Lastname must not be empty</p>
		</div>
		<div class="form-control">
			<label for="description" :class="{ invalidText: !description.isValid }"
				>Description</label
			>
			<textarea
				name=""
				id="description"
				cols="30"
				rows="7"
				v-model="description.value"
				:class="{ invalidBorder: !description.isValid }"
				@blur="clearValidity('description')"
			></textarea>
			<p v-if="!description.isValid">Description must not be empty</p>
		</div>
		<div class="form-control">
			<label for="rate" :class="{ invalidText: !rate.isValid }"
				>Hourly Rate</label
			>
			<input
				type="number"
				id="rate"
				v-model="rate.value"
				:class="{ invalidBorder: !rate.isValid }"
				@blur="clearValidity('rate')"
			/>
			<p v-if="!rate.isValid">Rate must be greater than 0</p>
		</div>
		<div class="area-control">
			<h3>Area of expertise</h3>
			<div class="area">
				<input
					type="checkbox"
					id="frontend"
					value="frontend"
					v-model="areas.value"
					@blur="clearValidity('areas')"
				/>
				<label for="frontend" :class="{ invalidText: !areas.isValid }"
					>Frontend Development</label
				>
			</div>
			<div class="area">
				<input
					type="checkbox"
					id="backend"
					value="backend"
					v-model="areas.value"
					@blur="clearValidity('areas')"
				/>
				<label for="backend" :class="{ invalidText: !areas.isValid }"
					>Backend Development</label
				>
			</div>
			<div class="area">
				<input
					type="checkbox"
					id="career"
					value="career"
					v-model="areas.value"
					@blur="clearValidity('areas')"
				/>
				<label for="career" :class="{ invalidText: !areas.isValid }"
					>Career Advisory</label
				>
			</div>
			<p v-if="!areas.isValid">At least one of expertise must be selected</p>
		</div>
		<p v-if="!formIsValid">Please fix the above errors and submit again</p>
		<base-button mode="flat">Registr</base-button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			firstname: {
				value: null,
				isValid: true,
			},
			lastname: {
				value: null,
				isValid: true,
			},
			description: {
				value: null,
				isValid: true,
			},
			rate: {
				value: null,
				isValid: true,
			},
			areas: {
				value: [],
				isValid: true,
			},
			formIsValid: true,
		}
	},
	methods: {
		clearValidity(input) {
			this[input].isValid = true
		},
		checkValidity() {
			if (!this.firstname.value) {
				this.firstname.isValid = false
				this.formIsValid = false
			}
			if (!this.lastname.value) {
				this.lastname.isValid = false
				this.formIsValid = false
			}
			if (!this.description.value) {
				this.description.isValid = false
				this.formIsValid = false
			}
			if (!this.rate.value) {
				this.rate.isValid = false
				this.formIsValid = false
			}
			if (this.areas.value.length <= 0) {
				this.areas.isValid = false
				this.formIsValid = false
			}
		},
		submitForm() {
			this.checkValidity()
			if (!this.formIsValid) {
				return false
			}

			const newCoach = {
				fullName: this.firstname.value + '' + this.lastname.value,
				description: this.description.value,
				rate: this.rate.value,
				badges: this.areas.value,
			}
			this.$emit('registr-coach', newCoach)
			this.$router.replace('/coaches')
		},
	},
}
</script>

<style scoped>
form {
	margin-top: 1rem;
}
form label {
	font-weight: bold;
	display: block;
	font-size: 1.2rem;
}
.form-control input {
	width: 100%;
	height: 2rem;
	margin: 1rem 0;
	font-size: 1.5rem;
	border-radius: 3px;
	border: 1px solid #b1aeae;
}
textarea {
	width: 100%;
	margin-top: 1rem;
}
.form-control textarea {
	font-size: 1.5rem;
}
textarea label {
	margin-bottom: 1rem;
}
.area {
	display: flex;
	gap: 0.5rem;
}
.area label {
	font-weight: normal;
}
.area-control {
	margin: 0 0 1rem 0;
}
input[type='text']:focus,
input[type='number']:focus,
textarea:focus {
	outline: 1px solid #3a0061;
	background: #f0e6fd;
}
p {
	margin-bottom: 1rem;
	font-size: 1.2rem;
}
.invalidText {
	color: red;
}
.form-control .invalidBorder {
	border: 1px solid red;
}
</style>
