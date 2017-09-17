/*
 * checkvalue Plug-in
 * Copyright (c) 2017 Cybozu
 *
 * Licensed under the MIT License
 */
jQuery.noConflict();

(function($, PLUGIN_ID) {
    'use strict';

    // プラグインIDの設定
    var KEY = PLUGIN_ID;
    var CONF = kintone.plugin.app.getConfig(KEY);
    function escapeHtml(htmlstr) {
        if (htmlstr == undefined) return false;
        
        return htmlstr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/'/g, '&quot;').replace(/'/g, '&#39;');
    }

    function setDropdown() {
        // フォーム設計情報を取得し、選択ボックスに代入する
        kintone.api(kintone.api.url('/k/v1/preview/form', true), 'GET', {'app': kintone.app.getId()}, function(resp) {

            for (var i = 0; i < resp.properties.length; i++) {
                var prop = resp.properties[i];
                var $option = $('<option>');

                switch (prop.type) {
                    // 文字列と数値が対象(変更前イベントの対象、テキスト入力可能)
                    case 'DATE':

                        $option.attr('value', escapeHtml(prop.code));
                        $option.text(escapeHtml(prop.label));
                        $('#select_birthday_field').append($option.clone());
                        break;
                        
                    default :
                        break;
                }
            }
            // 初期値を設定する
            $('#select_birthday_field').val(CONF['birth']);
            $('#select_age_field').val(CONF['age']);
        });
    }

    $(document).ready(function() {

        // 既に値が設定されている場合はフィールドに値を設定する
        if (CONF) {
            // ドロップダウンリストを作成する
            setDropdown();
        }

        // 「保存する」ボタン押下時に入力情報を設定する
        $('#check-plugin-submit').click(function() {
            var config = [];
            var birth = $('#select_birthday_field').val();
            var age = $('#select_age_field').val();
            // 必須チェック
            if (birth === '' || age === '') {
                alert('必須項目が入力されていません');
                return;
            }
            config['birth'] = birth;
            config['age'] = age;

            kintone.plugin.app.setConfig(config);
        });

        // 「キャンセル」ボタン押下時の処理
        $('#check-plugin-cancel').click(function() {
            history.back();
        });
    });

})(jQuery, kintone.$PLUGIN_ID);
