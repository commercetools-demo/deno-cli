// little tool to remove terraform cache stuff

const tf = {
  cachefolder: `.terraform`,
  lock: `.terraform.lock.hcl`,
  state: `terraform.tfstate`,
  backup: `terraform.tfstate.backup`,
  vars: "terraform.tfvars",
};

function remove(resource: string) {
  try {
    const finfo: Deno.FileInfo = Deno.statSync(resource);

    if (finfo) {
      console.log(`Removing ${resource}`);
      Deno.removeSync(resource, { recursive: finfo.isDirectory });
    }
  } catch (_error) {
    console.log(`no need to remove ${resource}`);
  }
}

export function clean() {
  console.log(`Cleaning terraform state`);
  remove(tf.cachefolder);
  remove(tf.lock);
  remove(tf.state);
  remove(tf.backup);
  remove(tf.vars);
  console.log(`Done cleaning terraform state`);
}
