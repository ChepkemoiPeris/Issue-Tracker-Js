function fetchIssues(){
    //retrive issues from local storage and convert them to  JSON object again
    var issues =JSON.parse(localStorage.getItem('issues'));
var issuesList=document.getElementById('issuesList');
issuesList.innerHTML='';
if(issues == null){
    return [];
  }
for(var i=0;i<issues.length;i++){
    var id=issues[i].id;
    var desc=issues[i].description;
    var severity=issues[i].severity;
    var assignedTo=issues[i].assignedTo;
    var status=issues[i].status;

    issuesList.innerHTML += '<div class="well">'+
    '<h6>Issue ID: ' + id + '</h6>'+
    '<p><span class="label label-info">' + status + '</span></p>'+
    '<h3>' + desc + '</h3>'+
    '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
    '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
    '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
    '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
    '</div>';
    console.log("hey")
}
}
function saveIssue(e){
    //generate unique id version 5 by default. you can use chance.guid({version:4}) 
    var issueId=chance.guid();
    //retrive input values and store in local variables
    var issueDesc = document.getElementById('issueDescription').value;
    var issueSeverity = document.getElementById('issueSeverity').value;
    var issueAssignedTo = document.getElementById('issueAssigned').value;
    var issueStatus='open';
    //new issue object is inserted into issues
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo:issueAssignedTo,
        status:issueStatus
    }
    if (localStorage.getItem('issues') === null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
      } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
      }
      
      document.getElementById('issueInputForm').reset();
     //calling fetchIssues finction to make sure that list output is regenarated and new issue item will be visible
      fetchIssues();
      console.log("working")
      e.preventDefault(); 
}
function setStatusClosed (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = "Closed";
      }
    }
      
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }
  function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }
 