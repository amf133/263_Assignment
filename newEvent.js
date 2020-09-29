let clusters;

$.get('getClusters.php', function (data) {
    clusters = JSON.parse(data);
    showClusters();
    return;
});

function showClusters() {
    for (let i = 0; i < clusters.length; i++) {
        let sel = document.getElementById("dropdownMenu");
        let cluster = document.createElement('option')
        cluster.innerHTML = clusters[i];
        sel.appendChild(cluster);
    }
}