const shell = require('shelljs');
shell.config.silent = true;
import logger from "./logger";

function getDirectoryName(data) {
    return `./repo/${data.commit.id}`;
}

export function deleteRepoDirectory(data) {
    const directoryName = getDirectoryName(data);
    logger.logDeletingRepoDirectory(data.uniqueLogId, directoryName);
    shell.rm("-rf", directoryName);
}

export function downloadRepository(data) {

    function getArchiveLink() {
        let archiveLink = data.repository.archive_url;
        archiveLink = archiveLink.replace("{archive_format}", "tarball");
        return archiveLink.replace("{/ref}", `/${data.commit.id}`);
    }

    function getCommandToDownloadRepo() {
        return `curl -L ${getArchiveLink()} | tar xz --strip=1`
    }

    const directoryName = getDirectoryName(data);
    deleteRepoDirectory(data);
    logger.logDownloadingRepo(data.uniqueLogId, getArchiveLink(), directoryName);
    shell.mkdir(directoryName);
    shell.cd(directoryName);
    shell.exec(getCommandToDownloadRepo());
    shell.cd("../..");
}