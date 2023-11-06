document.querySelector('#chatbot_script').innerHTML = `
	&lt;div id="chatbot" value="" hidden&gt;&lt;div&gt;
	<br>
	&lt;script src="https://storage.googleapis.com/edu_public/axios.min.js"&gt;&lt;/script&gt;
	<br>
	&lt;script src="https://storage.googleapis.com/edu_public/bot.js"&gt;&lt;/script&gt;                    
`

let imagePreview = document.getElementById('imagePreview')
let svg = imagePreview.querySelector('svg')
let removeBtn = document.querySelector('.avatar-container .remove-btn')

function readURL(input) {
	if (input.files && input.files[0]) {
		createBotChangeHandler(input)
		let reader = new FileReader()
		reader.onload = function (e) {
			svg.style.display = 'none'
			removeBtn.style.display = 'flex'
			imagePreview.style.backgroundImage = 'url(' + e.target.result + ')'
		}
		reader.readAsDataURL(input.files[0])
	}
}

function createBotChangeHandler(el) {
	switch (el.id) {
		case 'bot':
			const chatName = document.querySelector('.chatMockup #chatName')
			chatName.innerHTML = el.value.trim()
			break
		case 'message':
			const chatMessage = document.querySelector('.chatMockup #chatMessage')
			chatMessage.innerHTML = el.value.trim()
			break
		case 'imageUpload':
			const chatLogo = document.querySelector('.chatMockup #chatLogo')
			let reader = new FileReader()
			reader.onload = function (e) {
				chatLogo.src = e.target.result
			}
			reader.readAsDataURL(el.files[0])
			break
	}
	console.log(el, el.id)
}

function clearImageInput() {
	let imageInput = document.querySelector('.avatar #imageUpload')
	imageInput.value = null
	imagePreview.style.backgroundImage = ''
	removeBtn.style.display = 'none'
	svg.style.display = 'block'
}

document.getElementById('imageUpload').addEventListener('change', function () {
	readURL(this)
})

const copySetupContent = async text => {
	try {
		await navigator.clipboard.writeText(text)
		console.log('Content copied to clipboard')
	} catch (err) {
		console.error('Failed to copy: ', err)
	}
}

function onSetupCopyClick(event) {
	const btn = event.target.closest('button')
	btn.innerHTML = `
    <i class="fa-solid fa-check"></i>
    `
	btn.classList.add('active-copy')
	setTimeout(() => {
		btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
            <path fill="currentColor" d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-7 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1M7 7h10V5h2v14H5V5h2v2Z"></path>
        </svg>
        `
		btn.classList.remove('active-copy')
	}, 2000)
	const parentDiv = btn.parentNode
	const text = parentDiv.querySelector('code').innerText
	copySetupContent(text)
}
