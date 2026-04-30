/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const CutsItmRvRtngsCntrl = require('../../controllers/CutsItmRvRtngsCntrl');
const CutsItmRvRtngsFlsCntrl = require('../../controllers/CutsItmRvRtngsFlsCntrl');

module.exports.controller = (app) => {

  app.get('/', CutsItmRvRtngsCntrl.apiServerStatus);
  
  app.post('/kmvc/custs/item/rvrtngs/list', CutsItmRvRtngsCntrl.getCustsItemRvRtngsList);
  app.post('/kmvc/custs/item/rvrtngs/fls/list', CutsItmRvRtngsFlsCntrl.getCustsItemFlsRvRtngsList);
  app.post('/kmvc/custs/myorders/item/rating', CutsItmRvRtngsCntrl.userMyOrdsRvwRtng);
  app.post('/kmvc/custs/myorders/item/rating/view', CutsItmRvRtngsCntrl.userMyOrdsRvwRtngView);
  app.post('/kmvc/custs/myorders/item/rating/update', CutsItmRvRtngsCntrl.userMyOrdsRvwRtngUpdate);
  app.post('/kmvc/custs/item/rvrtngs/likes/count/update', CutsItmRvRtngsCntrl.updateCustsItemRvRtngsLikesCount);

}
 
