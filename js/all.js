function togglePassSee(){var t=$(".password input"),a=t.attr("type");$(".password-see").toggleClass("active"),"password"==a?t.attr("type","text"):t.attr("type","password")}$(".tab-item").on("click",function(){var t=$(this).data("href");$(".tabcontent,.tab-item").removeClass("active"),$('.restaruant-tabs-item[data-href="'+t+'"]').addClass("active"),$("#"+t).addClass("active")}),$(".js-open-search-filter-modal").on("click",function(){$("#search_filter_modal").addClass("active")});