const shell = require('shelljs');

export default function(data) {

    function getArchiveLink() {
        let archiveLink = data.repository.archive_url;
        archiveLink = archiveLink.replace("{archive_format}", "tarball");
        return archiveLink.replace("{/ref}", `/${data.commit.id}`);
    }

    function getCommandToDownlaodRepo() {
        return `curl -L ${getArchiveLink()} | tar xz --strip=1`
    }

    shell.rm("-rf", "./repo");
    shell.mkdir("./repo");
    shell.cd("./repo");
    shell.exec(getCommandToDownlaodRepo());
    shell.cd("..");
}