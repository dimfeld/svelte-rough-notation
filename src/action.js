import { annotate } from "rough-notation";

export default function(node, config) {
  function applyConfig(target, c) {
    for(let key in c) {
      if(key !== 'visible' && (!c.hasOwnProperty || c.hasOwnProperty(key))) {
        let value = c[key];
        if(target[key] !== value) {
          target[key] = value;
        }
      }
    }
  }

  function updateVisible(visible) {
    if(visible) {
      annotation.show();
    } else {
      annotation.hide();
    }
  }

  let annotateConfig = {};
  applyConfig(annotateConfig, config);
  let annotation = annotate(node, annotateConfig);
  updateVisible(config.visible);

  return {
    update(newConfig) {
      applyConfig(annotation, newConfig);
      updateVisible(newConfig.visible);
    },
    destroy() {
      annotation.remove();
    }
  }
}
