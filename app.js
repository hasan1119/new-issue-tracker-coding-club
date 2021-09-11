const addBtn = document.getElementById('btn')
const descriptionField = document.getElementById('desc')
const sensibilityField = document.getElementById('sensibility')
const assignedField = document.getElementById('assigned')
const issueContainer = document.getElementById('issue-container')

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const description = descriptionField.value;
    const sensibility = sensibilityField.value;
    const assigned = assignedField.value;

    descriptionField.value = ''
    assignedField.value = ''

    const status = "Open"
    const id = parseInt(Math.random() * 10000000)
    const issue = {
        description,
        sensibility,
        assigned,
        status,
        id
    }
    let data;
    const issues = localStorage.getItem('issues')
    if (issues) {
        data = JSON.parse(issues)
    } else {
        data = []
    }
    const newIssues = [...data, issue]
    localStorage.setItem('issues', JSON.stringify(newIssues))
    showData()
})

function showData() {
    const issues = JSON.parse(localStorage.getItem('issues'))
    issueContainer.innerHTML = ''
    issues.forEach(issue => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="well bg-info shadow-lg p-4 mb-5">
        <h6>Issue ID: ${issue.id} </h6>
        <p><span class="bg-success rounded px-2 py-1">${issue.status}</span></p>
        <h3>${issue.description}</h3>
        <p>${issue.sensibility}</p>
        <p>${issue.assigned}</p>
        <button href="#" onclick="setStatusClosed(${issue.id})" class="btn btn-warning">Close</button>
        <button href="#" onclick="deleteIssue(${issue.id})" class="btn btn-danger">Delete</button>
        </div>`
        issueContainer.appendChild(div)
    });
}
function deleteIssue(id) {
    const issues = JSON.parse(localStorage.getItem('issues'))
    const filteredIssues = issues.filter(issue => issue.id != id)
    localStorage.setItem('issues', JSON.stringify(filteredIssues))
    showData()
}
function setStatusClosed(id) {
    const issues = JSON.parse(localStorage.getItem('issues'))
    const updatedIssues = []
    issues.forEach(issue => {
        if (issue.id == id) {
            issue.status = 'Close'
        }
        updatedIssues.push(issue)
    })
    localStorage.setItem('issues', JSON.stringify(updatedIssues))
    showData() 
}