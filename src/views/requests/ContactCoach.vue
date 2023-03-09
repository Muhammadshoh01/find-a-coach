<template>
	<section>
		<form class="form" @submit.prevent="submit">
			<div class="form-control">
				<label for="email">Your Email</label> <br />
				<input
					type="text"
					id="email"
					name="email"
					v-model="email"
					:class="{ err: !isValid }"
				/>
			</div>
			<div class="form-control">
				<label for="message">Message</label> <br />
				<textarea
					name="message"
					id="message"
					cols="30"
					rows="5"
					v-model="message"
					:class="{ err: !isValid }"
				></textarea>
			</div>
			<p v-if="!isValid" class="error">
				Please enter a valid email and non-empty message.
			</p>
			<base-button mode="flat">Send Message</base-button>
		</form>
	</section>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			message: '',
			isValid: true,
		}
	},
	methods: {
		submit() {
			this.isValid = true
			if (
				this.email === '' ||
				!this.email.includes('@') ||
				this.message === ''
			) {
				this.isValid = false
				return
			}
			this.$store.dispatch('contactCoach', {
				email: this.email,
				message: this.message,
				coachId: this.$route.params.id,
			})
			this.$router.replace('/coaches')
		},
	},
}
</script>

<style scoped>
.form {
	border-radius: 8px;
	border: 1px solid #333;
	padding: 1rem;
}
.form-control input {
	height: 2rem;
}
.form-control label {
	font-weight: bold;
	font-size: 1.2rem;
}
.form-control input,
.form-control textarea {
	width: 100%;
	margin-bottom: 0.7rem;
	margin-top: 0.7rem;
	font-size: 1.5rem;
}
.error {
	color: red;
	font-weight: bold;
	margin-bottom: 1rem;
}
.err {
	border: 1px solid red;
}
</style>
