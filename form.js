document
	.getElementById("yfsRegistration")
	.addEventListener("submit", async function (e) {
		e.preventDefault();

		const form = e.target;

		// collect multiple skills from checkboxes
		const selectedSkills = Array.from(
			document.querySelectorAll('input[name="Skills"]:checked')
		)
			.map((cb) => cb.value)
			.join(", ");

		const formData = {
			Name: form.Name.value,
			Roll: form.Roll.value,
			Branch: form.Branch.value,
			Section: form.Section.value,
			Year: form.Year.value,
			Phone: form.Phone.value,
			Skills: form.Skills.value,
			Why_do_you_wanna_Join_yfs: form.Why_do_you_wanna_Join_yfs.value,
		};

		const responseMessage = document.getElementById("responseMessage");

		try {
			const response = await fetch("https://sheetdb.io/api/v1/sicu7w7pq1zty", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: [formData] }),
			});

			if (response.ok) {
				responseMessage.style.color = "green";
				responseMessage.textContent =
					"✅ Registration successful! Redirecting...";

				// Reset the form
				form.reset();

				// Redirect to WhatsApp group after 1.5 sec
				setTimeout(() => {
					window.location.href =
						"https://chat.whatsapp.com/HMqFt1ghAPV5jQ7nkEIXEp?mode=ac_t";
				}, 1500);
			} else {
				responseMessage.style.color = "red";
				responseMessage.textContent = "❌ Failed to submit. Try again.";
			}
		} catch (error) {
			responseMessage.style.color = "red";
			responseMessage.textContent = "⚠️ Error: " + error.message;
		}
	});
